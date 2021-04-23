import React from 'react';
import {useWebId} from '@solid/react';

import useProfile from "./Profile";
import LoginBarView from '../views/LoginBarView';

const GetProfile= () => {
    const webId = useWebId();
    const profile = useProfile(webId);

    return <LoginBarView {...profile} />;
}

export default GetProfile;