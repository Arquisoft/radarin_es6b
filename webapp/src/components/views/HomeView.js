import React from 'react';
import LoadGoogleMap from '../utils/maps/LoadGoogleMap';
import {
    makeStyles
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { changeCovid } from '../../api/api';

const estilos = makeStyles(theme => ({
    margenAnterior: {
        marginTop: '10px',
        marginRight: '10px',
        fontSize: '18px',
    },
}));

function HomeView({ webId, users, locates, changeRadio, radio, user }) {

    const classes = estilos();

    const handleChange = (event) => {
        if (event.target.value <= 100 && event.target.value >= 1) {
            changeRadio(event.target.value);
        }
    };
    const handleChangeCovid = (event) => {
        changeCovid(webId, event.target.checked);
    };

    return (
        <div id="div1">
            <LoadGoogleMap id="lg" webId={webId} users={users} locates={locates} radio={radio}
            />
            <label className={classes.margenAnterior}>Radius:</label>
            <input className={classes.margenAnterior} type="number" value={radio} onChange={handleChange} />
            <label className={classes.margenAnterior}> Do you have COVID?</label>

            { user ? <Switch
                checked={user.covid}
                onChange={handleChangeCovid}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            /> : null}

        </div>
    );
}

export default HomeView;