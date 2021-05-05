import React, { useCallback, useEffect, useState, useRef } from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";
import { useWebId } from '@solid/react';
import useProfile from "../solid/Profile";
import FriendMark from '../user/FriendsMark/FriendMark';
import LocateMark from '../locate/locateMark/LocateMark';
import mapStyle from './MapStyles';
import icon from '../../img/mark-user.png';
import {
    Avatar,
    makeStyles
} from '@material-ui/core';
import { BeatLoader } from 'react-spinners';
import Button from "@material-ui/core/Button";

const estilos = makeStyles(theme => ({
    error: {
        color: '#FF0000',
    }
}));

const estilosMapa = makeStyles(theme => ({
    large: {
        marginLeft: '40%',
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

const radioAccion = 50;
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
        loadingElement: <BeatLoader loading></BeatLoader>,
        containerElement: <div style={{ height: `750px`, width: '100%' }} />,
        mapElement: <div style={{ height: `100%` }} />,
        isMarkerShown: true,

    }),
    withScriptjs,
    withGoogleMap
)


    ((props) => {
        const webId = useWebId();
        const profile = useProfile(webId);
        const mapRef = useRef(null);
        const classes = estilosMapa();

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
                mapRef.current.fitBounds(bounds);
            }
        }, [mapRef, props.Latitud, props.Longitud]);


        const onMapClick = function (event) {
            var texto = prompt("Nombre de la localización:");
            if (texto === "") {
                alert("No se aceptan localizaciones sin un nombre")
                return;
            }
            else if (texto !== null) {
                props.addLocalLocate(event.latLng.lat(), event.latLng.lng(), texto, webId);
            }
        };
        const getDistanceFromLatLonInKm = function (lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - props.Latitud);  // deg2rad below
            var dLon = deg2rad(lon2 - props.Longitud);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(props.Latitud)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        };

        const deg2rad = function (deg) {
            return deg * (Math.PI / 180)
        };

        useEffect(() => {
            fitBounds();
        }, [fitBounds]);


        return (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                options={options}
                ref={mapRef}
                onClick={(event) => {
                    onMapClick(event);
                }}
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
                                <Avatar className={classes.large} name={profile.fullName} src={`${profile.imageSrc}`} />
                                <h4>{`${profile.fullName}`}</h4>
                                <a href={profile.webId}><Button variant="contained" color="primary" edge="end" >My Solid profile</Button></a>
                            </div>
                        </InfoWindow>

                    }
                </Marker>
                <Circle center={{ lat: props.Latitud, lng: props.Longitud }} radius={radioAccion * 1000} options={{
                    strokeColor: '#0022ff',
                    fillColor: '#0099ff',
                    fillOpacity: 0.1
                }}
                    onClick={(event) => {
                        onMapClick(event);
                    }} />
                {
                    props.friends.map((friend, i) => {
                        if (getDistanceFromLatLonInKm(friend.latitud, friend.longitud) <= radioAccion) {
                            return <FriendMark key={`friendMark_${i}`} friend={friend} />;
                        }
                        else {
                            return null;
                        }
                    })
                }

                {
                    props.locates.map((locate, i) => {
                        return <LocateMark key={`locateMark_${i}`} locate={locate} updateLocalLocate={props.updateLocalLocate} deleteLocalLocate={props.deleteLocalLocate} />;
                    })
                }
            </GoogleMap>
        );
    });

function MyFancyComponent({ friends, locates, addLocalLocate, updateLocalLocate, deleteLocalLocate }) {
    const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
    const [permisos, setPermisos] = useState(false);
    const classes = estilos();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setMapPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setPermisos(true);
            });
        } else {
            console.log("Geolocation is not supported by this browser!");
            setPermisos(false);
        }
    }, [setMapPosition, permisos]);


    if (permisos !== null) {
        if (permisos) {
            return (
                <MyMapComponent
                    Latitud={mapPosition.lat}
                    Longitud={mapPosition.lng}
                    friends={friends}
                    locates={locates}
                    addLocalLocate={addLocalLocate}
                    updateLocalLocate={updateLocalLocate}
                    deleteLocalLocate={deleteLocalLocate}
                />
            );
        }
        else {
            return (<div>
                <h1 className={classes.error}>Geolocation is not supported by this browser!</h1>
            </div>);
        }
    }
    else {
        return <BeatLoader loading></BeatLoader>;
    }
}


export default MyFancyComponent;