import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyAzKr-9NRgqHcrPjJyKiSDXPcRQbWRqkdY");
Geocode.enableDebug();

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAzKr-9NRgqHcrPjJyKiSDXPcRQbWRqkdY",
        loadingElement: <p>Cargando</p>,
        containerElement: <div style={{ height: `600px`, width: '800px' }} />,
        mapElement: <div style={{ height: `100%` }} />,
        isMarkerShown: true,

    }),
    withScriptjs,
    withGoogleMap
)


    ((props) => {

        return (
            <GoogleMap
                defaultZoom={18}
                defaultCenter={{ lat: props.Latitud, lng: props.Longitud }}
            >
                {props.isMarkerShown && <Marker position={{ lat: props.Latitud, lng: props.Longitud }} />}
                {props.friend.webId && <Marker position={{ lat: props.friend.lat, lng: props.friend.lng }} />}

            </GoogleMap>);
    });

class MyFancyComponent extends React.PureComponent {

    state = {
        isMarkerShown: false,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        friend: {
            webId: this.props.selectedFriend,
            lat: 0,
            lng: 0,
        }
    };



     getFriends = async function () {

        const information = {
            "solidId": this.props.selectedFriend
        }
        var respuesta = await fetch("http://localhost:5000/api/user/getById",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(information)
            });

        var user = await respuesta.json();

        if (user != null) {
            this.setState({
                friend: {
                    webId: this.friend.webId,
                    lat: user.latitud,
                    lng: user.loguitud,
                }
            });
        }
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
                });
            },
            error => {
                console.error(error);
            }
        );
    };


    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                Latitud={this.state.mapPosition.lat}
                Longitud={this.state.mapPosition.lng}
                friend={this.state.friend}
            />
        )
    }
}



export default MyFancyComponent;
