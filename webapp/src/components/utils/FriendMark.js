import React, { useState, useEffect, useCallback } from "react";
import useProfile from "./Profile";
import { Marker, InfoWindow } from "react-google-maps"
import icon from '../img/mark-user.png';
import push from './Notificacion';
import {
    makeStyles
} from '@material-ui/core';

const estilos = makeStyles(theme => ({

    button: {
        display: 'inline'
    },
    onlineColor: {
        color: '#35DF13',
    },
    oflineColor: {
        color: '#FF0000',
    }
}));

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

    const classes = estilos();

    const myDateParse = (myDate) => {
        var date = new Date(myDate);
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        return mm + '/' + dd + '/' + yyyy + ' at ' + hours + ':' + min + ':' + sec;
    };

    const getDifTime = (myDate) => {
        var date = new Date(myDate);
        var now = Date.now();
        var diffTime = Math.abs(now - date);
        console.log(diffTime);
        return diffTime;
    };


    const getContent = () => {
        if (friend.updated_at) {
            var diff = getDifTime(friend.updated_at);
            if (diff < 20000) {
                return (
                    <div className={classes.button}>
                        <h6 className={classes.onlineColor}>ONLINE</h6>
                        <h4>{`${profileFriend.fullName}`}</h4>
                        <p>Last login in {myDateParse(friend.updated_at)}</p>
                    </div>
                );
            }
            else {
                return (
                    <div className={classes.button}>
                        <h6 className={classes.oflineColor}>OFLINE</h6>
                        <h4>{`${profileFriend.fullName}`}</h4>
                        <p>Last login in {myDateParse(friend.updated_at)}</p>
                    </div>
                );
            }
        }
        else {
            return null;
        }
    }

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
                    {
                        getContent()
                    }
                </InfoWindow>
            }
        </Marker>
    );

}

export default FriendMark;