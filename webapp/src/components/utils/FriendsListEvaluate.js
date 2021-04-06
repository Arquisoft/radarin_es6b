import React from 'react';
import { evaluateList } from '@solid/react';
import FriendsList from './FriendsList';

const FrienddListEvaluate=(props)=>{
    const FriendsEvaluate=evaluateList("friends",FriendsList);
    
    return <FriendsEvaluate webId={props.webId} friends={`[${props.webId}].knows`} accionSelectFriend={props.accionSelectFriend} />;
 }

 export default FrienddListEvaluate;