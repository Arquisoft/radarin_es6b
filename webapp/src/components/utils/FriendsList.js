import React, { useState, useCallback, useEffect } from 'react';
import SoldiFriend from './SolidFriend';
import { getUsers } from '../../api/api';

function FriendsList(props) {

    const [friends, setFriends] = useState([]);

    var getFriends = useCallback(async function () {

        getUsers(props.webId).then(response => {
            const realFriends = response
                .filter(posibleFriend => props.solidFriends.includes(posibleFriend.solidId))
                .map(friend => friend.solidId);
            setFriends(realFriends);
        }).catch(err => console.log(err));
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
        </div>);

}

export default FriendsList;