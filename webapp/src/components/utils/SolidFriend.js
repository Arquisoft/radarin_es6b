import React, { useState, useEffect } from "react";
import useProfile from "./Profile";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const SolidFriend = ({ webId, friendWebId,accionSelectFriend}) => {
    const [esAmigo, setEsAmigo] = useState(false);
    const profileFriend = useProfile(friendWebId);

    var getUsers = async function () {

        const information = {
            "solidId": webId,
        }
        var respuesta = await fetch("http://localhost:5000/api/user/getUsers",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(information)
            });
        var response = await respuesta.json();

        response.map(posibleFriend => {
            if (posibleFriend.solidId === `${friendWebId}`) {
                setEsAmigo(true);
            }
            return null;
        });
    }


    useEffect(() => {
        getUsers();
    });

    if (!esAmigo) {
        return null;
    }
    else {
        return (
            <div style={{ marginTop: '10px ' }} >
                <Chip
                    color="primary"
                    avatar={<Avatar name={profileFriend.fullName} src={profileFriend.imageSrc} />}
                    label={`${profileFriend.fullName}`}
                    onClick={() => accionSelectFriend(`${friendWebId}`)}
                    />               
            </div >
        );
    }
}

export default SolidFriend;