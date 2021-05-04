import React, { useCallback, useEffect, useState, useRef } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps"
import { useWebId } from '@solid/react';
import useProfile from "./Profile";
import iconLocate from '../img/locatePin.png';
import mapStyle from './MapStyles';
import iconUser from '../img/mark-user.png';
import {
    makeStyles, Avatar
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
        isOpenLocate: false
    }), {
        onToggleOpenMy: ({ isOpenMy }) => () => ({
            isOpenMy: !isOpenMy,
        }),
        onToggleOpenLocate: ({ isOpenLocate }) => () => ({
            isOpenLocate: !isOpenLocate,
        })
    }),
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAzKr-9NRgqHcrPjJyKiSDXPcRQbWRqkdY",
        loadingElement: <BeatLoader loading></BeatLoader>,
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
        const mapRef = useRef(null);
        const classes = estilosMapa();
        let iconMarkerLocate = new window.google.maps.MarkerImage(
            iconLocate,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(35, 35)
        );
        let iconMarkerUser = new window.google.maps.MarkerImage(
            iconUser,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(35, 35)
        );

        const fitBounds = useCallback(() => {
            if (mapRef.current) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend({ lat: props.Latitud, lng: props.Longitud });
                if (props.locate) {
                    bounds.extend({ lat: props.locate.latitud, lng: props.locate.longitud });
                }
                mapRef.current.fitBounds(bounds);
            }
        }, [mapRef, props.locate, props.Latitud, props.Longitud]);

        const myDateParse=(myDate)=>{
            var date = new Date(myDate);  
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0');
            var yyyy = date.getFullYear();
            var hours=date.getHours();
            var min=date.getMinutes();
            var sec=date.getSeconds();
    
            return  mm + '/' + dd + '/' + yyyy+ ' at '+hours+':'+min+':'+sec;
        };


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
                    icon={iconMarkerUser}
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
                    props.locate
                    &&

                    <Marker
                        position={{ lat: props.locate.latitud, lng: props.locate.longitud }}
                        onClick={props.onToggleOpenLocate}
                        icon={iconMarkerLocate}
                    >
                        {props.isOpenLocate &&
                            <InfoWindow
                                onCloseClick={props.onToggleOpenLocate}
                            >
                                <div>
                                    <h4>{props.locate.texto}</h4>
                                    <p>Create in {myDateParse(props.locate.created_at)}</p>
                                    <p>Last update in {myDateParse(props.locate.updated_at)}</p>
                                </div>
                            </InfoWindow>

                        }
                    </Marker>
                }
                {
                    props.locate
                    &&
                    <Polyline
                        path={[{ lat: props.Latitud, lng: props.Longitud },
                        { lat: props.locate.latitud, lng: props.locate.longitud }
                        ]}
                        geodesic={true}
                        options={{
                            strokeColor: "#ff2527",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    />
                }

            </GoogleMap>);
    });


function MyFancyComponent({ selectedLocate }) {

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
                locate={selectedLocate}
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