import useProfile from "../../solid/Profile";
import push from './Notificacion';
import { useState,useEffect, useCallback } from "react";


const FriendMark = ({ friend }) => {
    const profileFriend = useProfile(friend.solidId);
    const [isSend, setIsSend]=useState(false);


    const sendNotification = useCallback(function () {
        if (`${profileFriend.fullName}` !== 'undefined' && !isSend) {
            push(`${profileFriend.fullName}`);
            setIsSend(true);
        }
    }, [profileFriend.fullName, isSend]);
    
    useEffect(() => {
        sendNotification();
    }, [sendNotification]);


    return null;

}

export default FriendMark;