import React, { useState, useCallback, useEffect } from 'react';
import FriendNotification from './FriendNotification';
import getDistanceFromLatLonInKm from '../../maps/getDistanceFromLatLonInKm';

const FriendListNotifications = ({ users, solidFriends, radio, user }) => {
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
            friendsToSend.map((friend, i) => {
                if (getDistanceFromLatLonInKm(user.latitud, user.longitud,friend.latitud, friend.longitud) <= radio) {
                    return (<FriendNotification key={"Friend_Notification_" + friend.solidId+"covid:"+friend.covid} friend={friend}></FriendNotification>);
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