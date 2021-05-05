import React from "react";
import useProfile from "../../solid/Profile";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const SolidFriend = ({ webId, friend, accionSelectFriend }) => {
    const profileFriend = useProfile(friend.solidId);

    return (
        <div style={{ marginTop: '10px ' }} >
            <Chip
                color="primary"
                avatar={<Avatar name={profileFriend.fullName} src={`${profileFriend.imageSrc}`} />}
                label={`${profileFriend.fullName}`}
                onClick={() => accionSelectFriend(friend)}
            />
        </div >
    );

}

export default SolidFriend;