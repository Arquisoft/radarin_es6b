import React from 'react';
import SoldiFriend from './SolidFriend';

function FriendsList(props) {



    return (
        <div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
            {
                props.friends.map((friendWebId,i) => {
                    return <SoldiFriend key={`friend_${i}`} webId={props.webId} friendWebId={friendWebId} accionSelectFriend={props.accionSelectFriend}/>;
                })
            }
        </div>);

}

export default FriendsList;