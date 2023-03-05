import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);
    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsRenderer = new window.google.maps.DirectionsRenderer();
  }

  componentDidMount() {
    // Create the Google Map and center it on a specific location
    this.map = new window.google.maps.Map(this.mapRef, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 13
    });
    this.directionsRenderer.setMap(this.map);
    this.calculateAndRenderRoute(this.props.route);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route !== this.props.route) {
      this.calculateAndRenderRoute(this.props.route);
    }
  }

  calculateAndRenderRoute(route) {
    this.directionsService.route(
      {
        origin: 'San Francisco, CA',
        destination: 'San Jose, CA',
        waypoints: [{ location: route }],
        travelMode: 'DRIVING'
      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      }
    );
  }

  render() {
    return (
      <div
        ref={ref => (this.mapRef = ref)}
        style={{ width: '100%', height: '500px' }}
      />
    );
  }
}

export default Map;
