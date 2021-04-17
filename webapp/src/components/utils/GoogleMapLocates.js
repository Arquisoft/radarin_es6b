import React, { useCallback, useEffect, useState, useRef } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { useWebId } from '@solid/react';
import useProfile from "./Profile";
import iconLocate from '../img/locatePin.png';
import mapStyle from './MapStyles';
import iconUser from '../img/mark-user.png';


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
        const mapRef = useRef(null);
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
                                <h4>Me({`${profile.fullName}`})</h4>
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
                                </div>
                            </InfoWindow>

                        }
                    </Marker>
                }

            </GoogleMap>);
    });


function MyFancyComponent({ selectedLocate }) {

    const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setMapPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser!");
        }
    }, [setMapPosition]);

    return (
        <MyMapComponent
            Latitud={mapPosition.lat}
            Longitud={mapPosition.lng}
            locate={selectedLocate}
        />
    )

}



export default MyFancyComponent;