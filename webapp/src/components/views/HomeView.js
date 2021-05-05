import React from 'react';
import LoadGoogleMap from '../utils/maps/LoadGoogleMap';

function HomeView({webId, users, locates}) {

    return (
        <div>
            <LoadGoogleMap webId={webId} users={users} locates={locates}
            />
        </div>
    );
}

export default HomeView;
