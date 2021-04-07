import React, { useEffect, useState, useCallback } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker, InfoWindow } from "react-google-maps";
import { useWebId } from '@solid/react';
import useProfile from './Profile';


function MyGoogleMap(props) {


    const zoom = 18;
    const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const webId = useWebId();
    const profile = useProfile(webId);

    const getLocate = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setMapPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    }, [setMapPosition]);


    useEffect(() => {
        getLocate();
    }, [getLocate]);


    const onMarkerClick = function (marker, e) {
        setShowingInfoWindow(true);
    };

    const onClose = function (marker, e) {
        setShowingInfoWindow(false);
    };

    const AsyncMap = withScriptjs(
        withGoogleMap(
            props => (

                <GoogleMap

                    defaultZoom={zoom}
                    defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
                >
                    <Marker
                        onClick={onMarkerClick}
                        google={props.google}
                        name={'Current position'}
                        draggable={true}
                        position={{ lat: mapPosition.lat, lng: mapPosition.lng }}
                    >
                        {
                            showingInfoWindow
                            &&
                            <InfoWindow
                                onCloseClick={onClose}
                            >
                                <div>
                                    <h4>Me({`${profile.fullName}`})</h4>
                                </div>
                            </InfoWindow>
                        }
                    </Marker>
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

    );

}

export default MyGoogleMap;
