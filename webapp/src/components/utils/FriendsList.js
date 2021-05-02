import React, { useState, useCallback, useEffect } from 'react';
import SoldiFriend from './SolidFriend';
import Typography from '@material-ui/core/Typography';

function FriendsList(props) {

    const [friends, setFriends] = useState([]);

    var getFriends = useCallback(function () {
        if (props.users) {
            const realFriends = props.users
                .filter(posibleFriend => props.solidFriends.includes(posibleFriend.solidId));
            setFriends(realFriends);
        }
    }, [setFriends, props.users, props.solidFriends]);


    useEffect(() => {
        getFriends();
    }, [getFriends]);


    if (friends) {
        if (friends.length > 0) {
            return (
                <div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
                    {
                        friends.map((friend, i) => {
                            return <SoldiFriend key={`friend_${i}`} webId={props.webId} friend={friend} accionSelectFriend={props.accionSelectFriend} />;
                        })
                    }
                </div>
            );
        }
        else {
            return (
                <div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
                    <Typography component="p">
                        You still do not have any friends who fail using the application
            </Typography>
                </div>);

        }
    }
    else{
        return null;
    }
}

export default FriendsList;