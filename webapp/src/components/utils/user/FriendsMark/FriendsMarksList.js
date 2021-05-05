import React, { useState, useCallback, useEffect } from 'react';
import FriendMark from './FriendMark';
import { getUsers } from '../../api/api';
function FriendsList(props) {

    const [friends, setFriends] = useState([]);

    var getFriends = useCallback(async function () {
        getUsers(props.webId).then(response => {
            const realFriends = response
                .filter(posibleFriend => props.solidFriends.includes(posibleFriend.solidId));
            setFriends(realFriends);
        }).catch(err => console.log(err));
    }, [setFriends, props.webId, props.solidFriends]);


    useEffect(() => {
        getFriends();
    }, [getFriends]);


    return (
        friends.map((friend, i) => {
            return <FriendMark key={`friendMark_${i}`} friend={friend} />;
        })

    );
}

export default FriendsList;