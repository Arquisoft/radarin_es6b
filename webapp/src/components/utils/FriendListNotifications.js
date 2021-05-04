import React, { useState, useCallback, useEffect } from 'react';
import FriendNotification from './FriendNotification';

const FriendListNotifications = ({ users, solidFriends }) => {
    const [friendsToSend, setFriendsToSend] = useState([]);


    var getFriendsToSend = useCallback(function () {
        if (users) {
            const realFriends = users
                .filter(posibleFriend => solidFriends.includes(posibleFriend.solidId)).map(friend => {
                    return { friend: friend, sended: friendsToSend.includes(friend) };
                });
            setFriendsToSend(realFriends);
        }
    }, [users, solidFriends, friendsToSend]);


    useEffect(() => {
        getFriendsToSend();
    }, [getFriendsToSend]);

    if (friendsToSend.length > 0) {
        return (
            friendsToSend.map((user, i) => {
                if (!user.sended) {
                    return (<FriendNotification key={"Friend_Notification_" + user.friend.solidId} friend={user.friend}></FriendNotification>);
                }
                else {
                    return null;
                }
            })
        );
    }
    else {
        return null;
    }
}

export default FriendListNotifications;