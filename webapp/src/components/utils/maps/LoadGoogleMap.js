import React from 'react';
import { useLDflexList } from '@solid/react';
import MapList from './MapList';

const LoadGoogleMap=({webId, users, locates, radio})=>{
    const solidFriends = useLDflexList(`[${webId}].knows`).map(friend=> `${friend}`);

    return <MapList webId={webId} users={users} solidFriends={solidFriends} locates={locates} radio={radio} />;
 }

 export default LoadGoogleMap;