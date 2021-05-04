import React, { useCallback, useEffect, useState, useRef } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps"
import { useWebId } from '@solid/react';
import useProfile from "./Profile";
import mapStyle from './MapStyles';
import icon from '../img/mark-user.png';
import {
    makeStyles, Avatar
} from '@material-ui/core';
import { BeatLoader } from 'react-spinners';
import Button from "@material-ui/core/Button";

const estilos = makeStyles(theme => ({
    error: {
        color: '#FF0000',
    },
}));

const estilosMapa = makeStyles(theme => ({
    large: {
        marginLeft: '40%',
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    onlineColor: {
        color: '#35DF13',
    },
    oflineColor: {
        color: '#FF0000',
    },
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
        loadingElement: <BeatLoader loading></BeatLoader>,
        containerElement: <div
            style={{
                height: 600,
                width: '100%',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                padding: 0
            }}
        ></div>,
        mapElement: <div
            style={{
                width: "100%",
                marginLeft: 0
            }} />,
        isMarkerShown: true,

    }),
    withScriptjs,
    withGoogleMap
)


    ((props) => {
        const webId = useWebId();
        const profile = useProfile(webId);
        const profileFriend = useProfile(props.friendWebId);
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
                if (props.friend) {
                    bounds.extend({ lat: props.friend.latitud, lng: props.friend.longitud });
                }
                mapRef.current.fitBounds(bounds);
            }
        }, [mapRef, props.friend, props.Latitud, props.Longitud]);

        const myDateParse = (myDate) => {
            var date = new Date(myDate);
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0');
            var yyyy = date.getFullYear();
            var hours = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            return mm + '/' + dd + '/' + yyyy + ' at ' + hours + ':' + min + ':' + sec;
        };

        const getDifTime = (myDate) => {
            var date = new Date(myDate);
            var now = Date.now();
            var diffTime = Math.abs(now - date);
            return diffTime;
        };

        const getContent = () => {
            if (props.friend.updated_at) {
                var diff = getDifTime(props.friend.updated_at);
                if (diff < 20000) {
                    return (
                        <div className={classes.button}>
                            <Avatar className={classes.large} name={profileFriend.fullName} src={`${profileFriend.imageSrc}`} />
                            <h6 className={classes.onlineColor}>ONLINE</h6>
                            <h4>{profileFriend.fullName}</h4>
                            <p>Last login in {myDateParse(props.friend.updated_at)}</p>
                            <a href={profileFriend.webId}><Button variant="contained" color="primary" edge="end" >Solid profile</Button></a>
                        </div>
                    );
                }
                else {
                    return (
                        <div className={classes.button}>
                            <Avatar className={classes.large} name={profileFriend.fullName} src={`${profileFriend.imageSrc}`} />
                            <h6 className={classes.oflineColor}>OFLINE</h6>
                            <h4>{`${profileFriend.fullName}`}</h4>
                            <p>Last login in {myDateParse(props.friend.updated_at)}</p>
                            <a href={profileFriend.webId}><Button variant="contained" color="primary" edge="end" >Solid profile</Button></a>
                        </div>
                    );
                }
            }
            else {
                return null;
            }
        }
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
                                <Avatar className={classes.large} name={profile.fullName} src={`${profile.imageSrc}`} />
                                <h4>{`${profile.fullName}`}</h4>
                                <a href={profile.webId}><Button variant="contained" color="primary" edge="end" >My Solid profile</Button></a>
                            </div>
                        </InfoWindow>

                    }
                </Marker>

                {
                    props.friend
                    &&

                    <Marker
                        icon={iconMarker}
                        position={{ lat: props.friend.latitud, lng: props.friend.longitud }}
                        onClick={props.onToggleOpenFriend}
                    >
                        {props.isOpenFriend &&
                            <InfoWindow
                                onCloseClick={props.onToggleOpenFriend}
                            >
                                {getContent()}
                            </InfoWindow>

                        }
                    </Marker>
                }
                {
                    props.friend
                    &&
                    <Polyline
                        path={[{ lat: props.Latitud, lng: props.Longitud },
                        { lat: props.friend.latitud, lng: props.friend.longitud }
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
    }, [setMapPosition]);

    if (permisos) {
        return (
            <MyMapComponent
                Latitud={mapPosition.lat}
                Longitud={mapPosition.lng}
                friend={selectedFriend}
                friendWebId={selectedFriend ? selectedFriend.solidId : ""}
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