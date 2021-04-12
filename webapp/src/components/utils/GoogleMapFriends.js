import React, { useCallback, useEffect, useState, useRef } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { useWebId } from '@solid/react';
import useProfile from "./Profile";
import { getUserByWebId } from '../../api/api';

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
        const mapRef = useRef(null);

        const fitBounds = useCallback(() => {
            if (mapRef.current) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend({ lat: props.Latitud, lng: props.Longitud });
                if (props.friend.webId) {
                    bounds.extend({ lat: props.friend.lat, lng: props.friend.lng });
                }
                mapRef.current.fitBounds(bounds);
            }
        }, [mapRef, props.friend, props.Latitud, props.Longitud]);

        useEffect(() => {
            fitBounds();
        }, [fitBounds]);

        return (
            <GoogleMap
                ref={mapRef}
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

            </GoogleMap>
        );
    });

function MyFancyComponent({ selectedFriend }) {
    const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
    const [friend, setFriend] = useState({
        webId: selectedFriend,
        lat: 0,
        lng: 0,
    });



    const getFriends = useCallback(async function () {
        if (!selectedFriend) return;

        getUserByWebId(selectedFriend).then(user => {
            if (user != null) {
                setFriend({
                    webId: selectedFriend,
                    lat: user.latitud,
                    lng: user.longitud,
                });
            }
        }).catch(err => console.log(err));
    }, [selectedFriend]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setMapPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                getFriends();
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    }, [setMapPosition, getFriends]);


    return (
        <MyMapComponent
            Latitud={mapPosition.lat}
            Longitud={mapPosition.lng}
            friend={friend}
        />
    );
}


export default MyFancyComponent;