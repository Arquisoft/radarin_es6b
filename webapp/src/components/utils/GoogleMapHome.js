import React, { useCallback, useEffect, useState, useRef } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { useWebId } from '@solid/react';
import useProfile from "./Profile";
import FriendsMarksEvaluate from './FriendsMarksEvaluate';
import LocatesMarksEvaluate from './LocatesMarksEvaluate';
import { saveLocate } from '../../api/api';
import mapStyle from './MapStyles';
import LocateMark from './LocateMark';
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
        const [auxMarks, setAuxMarks]=useState([]);

        const fitBounds = useCallback(() => {
            if (mapRef.current) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend({ lat: props.Latitud, lng: props.Longitud });
                mapRef.current.fitBounds(bounds);
            }
        }, [mapRef, props.Latitud, props.Longitud]);


        const onMapClick = function (event) {
            var texto = prompt("Nombre de la localización:");
            if ( texto === "") {
                alert("No se aceptan localizaciones sin un nombre")
                return;
            }
            else if(texto !== null) {
                saveLocate(webId, event.latLng.lat(), event.latLng.lng(), texto);
                setAuxMarks(current => [...current, {
                    latitud: event.latLng.lat(),
                    longitud: event.latLng.lng(),
                    texto: texto,
                    solidId: webId
                }]);
            }
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
                    <FriendsMarksEvaluate webId={webId} />
                    <LocatesMarksEvaluate webId={webId} />
                    {
                          auxMarks.map((locate, i) => {
                            return <LocateMark key={`locateAuxMark_${i}`} locate={locate} />;
                        })
                    }
                </Marker>
            </GoogleMap>
        );
    });

function MyFancyComponent({ selectedFriend }) {
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
            console.error("Geolocation is not supported by this browser!");
        }
    }, [setMapPosition]);


    return (
        <MyMapComponent
            Latitud={mapPosition.lat}
            Longitud={mapPosition.lng}
        />
    );
}


export default MyFancyComponent;