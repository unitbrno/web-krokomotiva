package trip

import (
	"github.com/stretchr/testify/suite"
    "testing"
)

type TripServiceSuite struct {
	suite.Suite

	service *Service
}

func (s *TripServiceSuite) SetupSuite() {
}

func (s *TripServiceSuite) SetupTest() {

}

// Test
func (s *TripServiceSuite) Test() {

}

func TestTripServiceSuite(t *testing.T) {
	suite.Run(t, new(TripServiceSuite))
}

func (s *TripServiceSuite) TearDownSuite() {

}
