package trip

import (
	"github.com/gelidus/web-krokomotiva/core"
	google_protobuf "github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
	"googlemaps.github.io/maps"
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
