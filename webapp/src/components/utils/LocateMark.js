import React,{useState} from "react";
import icon from '../img/locatePin.png';
import {Marker, InfoWindow } from "react-google-maps"

const Locate = ({ locate }) => {
    const [showMark, setShowMark] = useState(false);
    let iconMarker = new window.google.maps.MarkerImage(
        icon,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new window.google.maps.Size(32, 32)
    );

    const changeShow = () => {
        setShowMark(!showMark);
    }

    return (
        <Marker
            icon={iconMarker}
            position={{ lat: locate.latitud, lng: locate.longitud }}
            onClick={changeShow}
        >
            {showMark &&
                <InfoWindow
                    onCloseClick={changeShow}
                >
                    <div>
                        <h4>{locate.texto}</h4>
                    </div>
                </InfoWindow>
            }
        </Marker>
    );
}

export default Locate;