import React from 'react';
import LoadGoogleMap from '../utils/LoadGoogleMap';
import {useWebId} from '@solid/react';

function HomeView() {
    const webId=useWebId();

    return (
        <div>
            <LoadGoogleMap webId={webId}
            />
        </div>
    );
}

export default HomeView;
