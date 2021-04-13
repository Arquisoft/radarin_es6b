import React, { useState } from "react";
import icon from '../img/locatePin.png';
import { Marker, InfoWindow } from "react-google-maps"
import Button from "@material-ui/core/Button";
import {
    makeStyles
} from '@material-ui/core';

const estilos = makeStyles(theme => ({

    button: {
        display: 'inline'
    }
}));

const Locate = ({ locate, updateLocalLocate, deleteLocalLocate }) => {
    const [showMark, setShowMark] = useState(false);
    let iconMarker = new window.google.maps.MarkerImage(
        icon,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new window.google.maps.Size(35, 35)
    );

    const changeShow = () => {
        setShowMark(!showMark);
    }

    const classes = estilos();

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
                    <div className={classes.button}>
                        <h3>{locate.texto}</h3>
                        {
                            updateLocalLocate &&
                            <div>
                                <Button variant="contained" color="primary" edge="end" onClick={() => {
                                    updateLocalLocate(locate._id);
                                    changeShow();
                                }}>Update</Button>

                                <Button variant="contained" color="primary" edge="end" onClick={() => {
                                    deleteLocalLocate(locate._id);
                                    changeShow();
                                }}>Delete</Button>
                            </div>
                        }
                    </div>
                </InfoWindow>
            }
        </Marker>
    );
}

export default Locate;