import React from 'react';
import { useLDflexList } from '@solid/react';
import FriendsList from './FriendsList';

const FriendsListEvaluate=(props)=>{
    const solidFriends = useLDflexList(`[${props.webId}].knows`).map(friend=> `${friend}`);

    return <FriendsList webId={props.webId} width={props.width} solidFriends={solidFriends} users={props.users} accionSelectFriend={props.accionSelectFriend} />;
 }

 export default FriendsListEvaluate;