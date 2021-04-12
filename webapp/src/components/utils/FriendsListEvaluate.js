import React from 'react';
import { useLDflexList } from '@solid/react';
import FriendsList from './FriendsList';

const FrienddListEvaluate=(props)=>{
    const solidFriends = useLDflexList(`[${props.webId}].knows`).map(friend=> `${friend}`);

    return <FriendsList webId={props.webId} solidFriends={solidFriends} accionSelectFriend={props.accionSelectFriend} />;
 }

 export default FrienddListEvaluate;