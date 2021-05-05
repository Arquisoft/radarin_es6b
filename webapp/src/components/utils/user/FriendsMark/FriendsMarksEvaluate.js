import React from 'react';
import { useLDflexList } from '@solid/react';
import FriendsMarksList from '../../FriendsMarksList';

const FriendsMarksEvaluate=(props)=>{
    const solidFriends = useLDflexList(`[${props.webId}].knows`).map(friend=> `${friend}`);

    return <FriendsMarksList solidFriends={solidFriends}  />;
 }

 export default FriendsMarksEvaluate;