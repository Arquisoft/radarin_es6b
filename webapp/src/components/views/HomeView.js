import React from 'react';
import LoadGoogleMap from '../utils/LoadGoogleMap';
import {useWebId} from '@solid/react';

function HomeView({users, locates}) {
    const webId=useWebId();

    return (
        <div>
            <LoadGoogleMap webId={webId} users={users} locates={locates}
            />
        </div>
    );
}

export default HomeView;
