import {useWebId} from '@solid/react';

import useProfile from "./Profile";

const GetProfileById= () => {
    const webId = useWebId();
    const profile = useProfile(webId);

    return profile;
}

export default GetProfileById;