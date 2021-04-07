import React from 'react';
import { withGoogleMap,InfoWindow, GoogleMap, withScriptjs, Marker, Map, GoogleApiWrapper} from "react-google-maps";
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyAzKr-9NRgqHcrPjJyKiSDXPcRQbWRqkdY");
Geocode.enableDebug();



class MyGoogleMap extends React.Component {

    state = {
        zoom: 18,
        height: 600,
        mapPosition: {
            lat: 0,
            lng: 0,
        }, 
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}   
    }


    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                });
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    };

    
       
    onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker, 
          showingInfoWindow: true
        });
    
    onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
      };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {                    
                this.setState({
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    
                    <GoogleMap
                        
                        defaultZoom={this.state.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >

                        <Marker
                            onClick={this.onMarkerClick}
                            google={this.props.google}
                            name={'Current position'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                        
                       />

        
                            
                      
                        
                               
                    </GoogleMap>
                )
            )
        );

            
         



         
        return (
            <div >
                <h1>Radarin Map</h1>

                <AsyncMap
                    
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzKr-9NRgqHcrPjJyKiSDXPcRQbWRqkdY&libraries=places"
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: '750px' }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                
                />
                
            </div>
            
        )
    }

}

export default MyGoogleMap;
