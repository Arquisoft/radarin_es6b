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


    const myDateParse=(myDate)=>{
        var date = new Date(myDate);  
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        var hours=date.getHours();
        var min=date.getMinutes();
        return  mm + '/' + dd + '/' + yyyy+ ' at '+hours+':'+min;
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
                        <p>Create in {myDateParse(locate.created_at)}</p>
                        <p>Last update in {myDateParse(locate.updated_at)}</p>
                        {
                            updateLocalLocate &&
                            <div>
                                <Button variant="contained" color="primary" edge="end" onClick={() => {
                                    updateLocalLocate(locate._id, locate.texto);
                                    changeShow();
                                }}>Update</Button>

                                <Button variant="contained" color="primary" edge="end" onClick={() => {
                                    deleteLocalLocate(locate._id, locate.solidId);
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