import React from "react";
import useProfile from "./Profile";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const SolidFriend = ({ webId, friendWebId,accionSelectFriend}) => {
    const profileFriend = useProfile(friendWebId);

        return (
            <div style={{ marginTop: '10px ' }} >
                <Chip
                    color="primary"
                    avatar={<Avatar name={profileFriend.fullName} src={`${profileFriend.imageSrc}`} />}
                    label={`${profileFriend.fullName}`}
                    onClick={() => accionSelectFriend(`${friendWebId}`)}
                    />               
            </div >
        );
}

export default SolidFriend;