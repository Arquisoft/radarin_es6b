import React, { useCallback, useEffect, useState, useRef } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps"
import { useWebId } from '@solid/react';
import useProfile from "./Profile";
import { getUserByWebId } from '../../api/api';
import mapStyle from './MapStyles';
import icon from '../img/mark-user.png';
import {
    makeStyles
} from '@material-ui/core';

const estilos = makeStyles(theme => ({
    error: {
        color: '#FF0000',
    }
}));

const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
};

const options = {
    styles: mapStyle,
};
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
        const profileFriend = useProfile(props.friend.webId);
        const mapRef = useRef(null);

        let iconMarker = new window.google.maps.MarkerImage(
            icon,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(35, 35)
        );
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
                mapContainerStyle={mapContainerStyle}
                options={options}
            >
                <Marker
                    icon={iconMarker}
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
                        icon={iconMarker}
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
                {
                    props.friend.webId
                    &&
                    <Polyline
                        path={[{ lat: props.Latitud, lng: props.Longitud  },
                            { lat: props.friend.lat, lng: props.friend.lng }
                        ]}
                        geodesic={true}
                        options={{
                            strokeColor: "#ff2527",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    />
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
    const [permisos, setPermisos] = useState(false);
    const classes = estilos();



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
                setPermisos(true);

                getFriends();
            });
        } else {
            console.log("Geolocation is not supported by this browser!");
            setPermisos(false);
        }
    }, [setMapPosition, getFriends]);

    if (permisos) {
        return (
            <MyMapComponent
                Latitud={mapPosition.lat}
                Longitud={mapPosition.lng}
                friend={friend}
            />
        );
    }
    else {
        return (<div>
            <h1 className={classes.error}>Geolocation is not supported by this browser!</h1>
        </div>);
    }
}


export default MyFancyComponent;