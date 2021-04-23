import React, { useState } from "react";
import useProfile from "./Profile";
import { Marker, InfoWindow } from "react-google-maps"

const FriendMark = ({ friend }) => {
    const profileFriend = useProfile(friend.solidId);
    const [showMark, setShowMark] = useState(false);

    const changeShow=()=>{
        setShowMark(!showMark);
    }

    return (
        <Marker
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