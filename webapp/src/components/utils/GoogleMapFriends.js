import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import Geocode from "react-geocode";
import { useWebId } from '@solid/react';
import useProfile from "./Profile";

Geocode.setApiKey("AIzaSyAzKr-9NRgqHcrPjJyKiSDXPcRQbWRqkdY");
Geocode.enableDebug();

const MyMapComponent = compose(
    withStateHandlers(() => ({
        isOpenMy: false,
        isOpenFriend: false
    }), {
        onToggleOpenMy: ({ isOpenMy }) => () => ({
            isOpenMy: !isOpenMy,
        }),
        onToggleOpenFriend: ({ isOpenFriend }) => () => ({
            isOpenFriend: !isOpenFriend,
        })
    }),
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
        const webId = useWebId();
        const profile = useProfile(webId);
        console.log(props.friend.webId);
        const profileFriend = useProfile(props.friend.webId);

        return (
            <GoogleMap
                defaultZoom={props.friend.webId? 2 :18}
                defaultCenter={props.friend.webId? { lat: (props.Latitud+props.friend.lat)/2, lng: (props.Longitud + props.friend.lng)/2 } :{ lat: props.Latitud, lng: props.Longitud }}
            >

                <Marker
                    position={{ lat: props.Latitud, lng: props.Longitud }}
                    onClick={props.onToggleOpenMy}
                >
                    {props.isOpenMy &&
                        <InfoWindow
                            onCloseClick={props.onToggleOpenMy}
                        >
                            <div>
                                <h4>Me({`${profile.fullName}`})</h4>
                            </div>
                        </InfoWindow>

                    }
                </Marker>

                {
                    props.friend.webId
                    &&

                    <Marker
                        position={{ lat: props.friend.lat, lng: props.friend.lng }}
                        onClick={props.onToggleOpenFriend}
                    >
                        {props.isOpenFriend &&
                            <InfoWindow
                                onCloseClick={props.onToggleOpenFriend}
                            >
                                <div>
                                    <h4>{`${profileFriend.fullName}`}</h4>
                                </div>
                            </InfoWindow>

                        }
                    </Marker>
                }

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
