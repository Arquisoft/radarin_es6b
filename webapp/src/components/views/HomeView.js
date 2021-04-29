import React from 'react';
import LoadGoogleMap from '../utils/LoadGoogleMap';
import {useWebId} from '@solid/react';
//import { Typography } from '@material-ui/core/';

function HomeView() {
    const webId=useWebId();

    return (
        <div>
            {/* <Typography gutterBottom variant="h3" component="h3" color='inherit' align="center">Radarin Map</Typography>; */}
            <LoadGoogleMap webId={webId}
            />
        </div>
    );
}

export default HomeView;
