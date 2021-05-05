import React, { useState, useCallback, useEffect } from 'react';
import FriendNotification from './FriendNotification';

const FriendListNotifications = ({ users, solidFriends }) => {
    const [friendsToSend, setFriendsToSend] = useState([]);


    var getFriendsToSend = useCallback(function () {
        if (users) {
            const realFriends = users
                .filter(posibleFriend => solidFriends.includes(posibleFriend.solidId));
            setFriendsToSend(realFriends);
        }
    }, [users, solidFriends]);


    useEffect(() => {
        getFriendsToSend();
    }, [getFriendsToSend]);

    if (friendsToSend.length > 0) {
        return (
            friendsToSend.map((user, i) => {
                return (<FriendNotification key={"Friend_Notification_" + user.solidId} friend={user}></FriendNotification>);
            })
        );
    }
    else {
        return null;
    }
}

export default FriendListNotifications;