import React from 'react';
import { useLDflexList } from '@solid/react';
import FriendListNotifications from './FriendListNotifications';

const FriendsNotifications=({users, webId, radio, user})=>{
    const solidFriends = useLDflexList(`[${webId}].knows`).map(friend=> `${friend}`);

    return <FriendListNotifications solidFriends={solidFriends} users={users} radio={radio} user={user} />;
 }

 export default FriendsNotifications;