import React, { useCallback, useEffect, useState, useRef } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { useWebId } from '@solid/react';
import useProfile from "./Profile";
import FriendMark from './FriendMark';
import LocateMark from './LocateMark';
import mapStyle from './MapStyles';
import icon from '../img/mark-user.png';


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
                                <h4>Me({`${profile.fullName}`})</h4>
                            </div>
                        </InfoWindow>

                    }

                    {
                        props.friends.map((friend, i) => {
                            return <FriendMark key={`friendMark_${i}`} friend={friend} />;
                        })
                    }

                    {
                        props.locates.map((locate, i) => {
                            return <LocateMark key={`locateMark_${i}`} locate={locate} updateLocalLocate={props.updateLocalLocate} deleteLocalLocate={props.deleteLocalLocate} />;
                        })
                    }
                </Marker>
            </GoogleMap>
        );
    });

function MyFancyComponent({ friends, locates, addLocalLocate, updateLocalLocate, deleteLocalLocate }) {
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
            friends={friends}
            locates={locates}
            addLocalLocate={addLocalLocate}
            updateLocalLocate={updateLocalLocate}
            deleteLocalLocate={deleteLocalLocate}

        />
    );
}


export default MyFancyComponent;