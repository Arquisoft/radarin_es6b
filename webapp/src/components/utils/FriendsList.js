import React, { useState, useCallback, useEffect } from 'react';
import SoldiFriend from './SolidFriend';

function FriendsList(props) {

    const [friends, setFriends] = useState([]);

    var getFriends = useCallback(async function () {

        const information = {
            "solidId": props.webId,
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

        const realFriends = response
            .filter(posibleFriend => props.solidFriends.includes(posibleFriend.solidId))
            .map(friend => friend.solidId);
        setFriends(realFriends);
    }, [setFriends, props.webId, props.solidFriends]);


    useEffect(() => {
        getFriends();
    }, [getFriends]);




    return (
        <div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
            {
                friends.map((friendWebId, i) => {
                    return <SoldiFriend key={`friend_${i}`} webId={props.webId} friendWebId={friendWebId} accionSelectFriend={props.accionSelectFriend} />;
                })
            }
        </div>
    );
}

export default FriendsList;