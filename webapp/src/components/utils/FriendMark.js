import React, { useState, useEffect, useCallback } from "react";
import useProfile from "./Profile";
import { Marker, InfoWindow } from "react-google-maps"
import icon from '../img/mark-user.png';
import push from './Notificacion';

const FriendMark = ({ friend }) => {
    const profileFriend = useProfile(friend.solidId);
    const [showMark, setShowMark] = useState(false);
    const [isSend, setIsSend] = useState(false);
    let iconMarker = new window.google.maps.MarkerImage(
        icon,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new window.google.maps.Size(35, 35)
    );
    //Notificacion


    const changeShow = () => {
        setShowMark(!showMark);
    }

    const sendNotification = useCallback(function () {
        if (`${profileFriend.fullName}` !== 'undefined' && !isSend) {
            push(`${profileFriend.fullName}`);
            setIsSend(true);
        }
    }, [profileFriend.fullName, isSend]);

    useEffect(() => {
        sendNotification();
    }, [sendNotification]);

    return (
        <Marker
            icon={iconMarker}
            position={{ lat: friend.latitud, lng: friend.longitud }}
            onClick={changeShow}
        >
            {showMark &&
                <InfoWindow
                    onCloseClick={changeShow}
                >
                    <div>
                        <h4>{`${profileFriend.fullName}`}</h4>
                    </div>
                </InfoWindow>
            }
        </Marker>
    );

}

export default FriendMark;