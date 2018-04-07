package trip

import (
	"errors"
	"github.com/gelidus/web-krokomotiva/core"
	google_protobuf "github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
	"googlemaps.github.io/maps"
	"strconv"
	"time"
)

// Trip represents an implementation of the service interface
type Service struct {
	MapsClient *maps.Client
}

// NewTrip creates a new service object
func NewService(mapsClient *maps.Client) *Service {
	return &Service{
		MapsClient: mapsClient,
	}
}

func (s *Service) GetVersion(ctx context.Context, in *google_protobuf.Empty) (*Version, error) {
	return &Version{
		Name: "1.0.0",
	}, nil
}

func (s *Service) Check(ctx context.Context, in *core.HealthCheckRequest) (*core.HealthCheckResponse, error) {
	return &core.HealthCheckResponse{
		Status: core.HealthCheckResponse_SERVING,
	}, nil
}

func (s *Service) GimmePlaces(ctx context.Context, in *PlaceRequest) (*Places, error) {
	resp, err := s.MapsClient.NearbySearch(context.Background(),
		&maps.NearbySearchRequest{
			Type:      maps.PlaceType(in.PlaceType),
			Radius:    uint(in.Radius),
			PageToken: in.Token,
			Location: &maps.LatLng{
				Lat: in.Lat,
				Lng: in.Lng,
			},
			MaxPrice: maps.PriceLevel(in.PriceMax),
			MinPrice: maps.PriceLevel(in.PriceMin),
		},
	)

	if err != nil {
		return &Places{}, nil
	}

	places := &Places{
		NextToken: resp.NextPageToken,
		Places:    []*Place{},
	}

	for _, p := range resp.Results {
		places.Places = append(places.Places, &Place{
			IconURL:    p.Icon,
			Name:       p.Name,
			PlaceID:    p.PlaceID,
			PriceLevel: int32(p.PriceLevel),
			Rating:     p.Rating,
			Address:    p.FormattedAddress,
			Lat:        p.Geometry.Location.Lat,
			Lng:        p.Geometry.Location.Lng,
		})
	}

	return places, nil
}

func (s *Service) GetDirections(ctx context.Context, req *DirectionRequest) (*Directions, error) {
	if len(req.Locations) < 1 {
		return nil, errors.New("not enough locations")
	}
	directions := make([]*Direction, 0, len(req.Locations)-1)
	departureTime := time.Now().Unix()
	if req.DepartureTime != 0 {
		departureTime = req.DepartureTime
	}
	for i := range req.Locations {
		if i == len(req.Locations)-1 {
			break
		}
		route, _, err := s.MapsClient.Directions(ctx, &maps.DirectionsRequest{
			Origin:      req.Locations[i],
			Destination: req.Locations[i+1],
			Mode:        maps.TravelModeTransit,
			DepartureTime: strconv.FormatInt(departureTime, 10),
		})
		if err != nil {
			return nil, err
		}
		durationSeconds := int64(route[0].Legs[0].Duration) / 1000000000
		directions = append(directions, &Direction{
			// ns to s
			Duration: durationSeconds,
		})
		departureTime += durationSeconds
	}

	return &Directions{
		Directions: directions,
	}, nil
}
