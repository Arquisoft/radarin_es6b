import React from 'react';
import Locate from './Locate';
import Typography from '@material-ui/core/Typography';
import { deleteLocate, updateLocate } from '../../api/api';
import {
    makeStyles
} from '@material-ui/core';

const estilos = makeStyles(theme => ({
    error: {
        color: '#FF0000',
    }
}));

function LocatesList({ width, accionSelectLocate, locates, selectedLocate }) {

    const classes= estilos();

    const deleteLocalLocate = async function (id, solidId) {
        if (selectedLocate && selectedLocate._id === id) {
            accionSelectLocate(null);
        }
        await deleteLocate(id, solidId);
    }

    const updateLocalLocate = async function (locate) {
        var id = locate._id;
        var textoAnterior = locate.texto;
        var texto = prompt("Nuevo nombre de la localización:", textoAnterior);
        if (texto === "") {
            alert("No se puede actualizar una localizacion sin un nombre")
            return;
        }
        else if (texto !== null) {
            await updateLocate(id, texto);
            if (selectedLocate && selectedLocate._id === locate._id) {
                accionSelectLocate(null);
            }
        }
    }

    if (locates) {
        if (width > 900) {

            if (locates.length > 0) {

                return (<div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
                    {
                        locates.map((locate, i) => {
                            return <Locate key={`locate_${i}`} locate={locate} accionSelectLocate={accionSelectLocate} deleteLocalLocate={deleteLocalLocate} updateLocalLocate={updateLocalLocate} />;
                        })
                    }
                </div>);
            }
            else {
                return (
                    <div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
                        <Typography component="p" className={classes.error}>
                            You don't have any location yet
            </Typography>
                    </div>);

            }
        }
        else{
            if (locates.length > 0) {

                return (<div style={{ display: 'inline-block', overflow: 'auto', width: (width-50), height: '600px' }}>
                    {
                        locates.map((locate, i) => {
                            return <Locate key={`locate_${i}`} locate={locate} accionSelectLocate={accionSelectLocate} deleteLocalLocate={deleteLocalLocate} updateLocalLocate={updateLocalLocate} />;
                        })
                    }
                </div>);
            }
            else {
                return (
                    <div style={{ display: 'inline-block', overflow: 'auto', width: (width-50), height: '600px' }}>
                        <Typography component="p" className={classes.error}>
                            You don't have any location yet
            </Typography>
                    </div>);

            }
        }
    }
    else {
        return null;
    }



}

export default LocatesList;