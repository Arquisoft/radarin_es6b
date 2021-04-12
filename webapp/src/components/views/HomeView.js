import React from 'react';
import Map from '../utils/MyGoogleMap';
import { Typography } from '@material-ui/core/';

function HomeView() {
    return (
        <div>
            <Typography gutterBottom variant="h3" component="h3" color='inherit' align="center">Radarin Map</Typography>
            <Map
            />
        </div>
    );
}

export default HomeView;
