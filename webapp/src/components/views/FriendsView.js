import React from 'react';
import { Typography } from '@material-ui/core/';
import useProfile from "../utils/Profile";
import {useWebId} from '@solid/react';
import ProfileImage from '../utils/ProfileImage';

function FriendsView(fullName, imageSrc){
    const webId = useWebId();
    const profile = useProfile(webId);   
    return (
            <React.Fragment>
             <Typography variant="h2">
             <ProfileImage fullName={
                 useProfile(profile.friends).fullName
                 } imageSrc={useProfile(profile.friends).imageSrc} />
             </Typography>
            </React.Fragment>
        );
}

export default FriendsView;
