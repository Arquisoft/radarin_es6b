import React from 'react';
import { useLDflexList } from '@solid/react';
import MapList from './MapList';

const LoadGoogleMap=({webId})=>{
    const solidFriends = useLDflexList(`[${webId}].knows`).map(friend=> `${friend}`);

    return <MapList webId={webId} solidFriends={solidFriends} />;
 }

 export default LoadGoogleMap;