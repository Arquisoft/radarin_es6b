import React from 'react';
import {useWebId} from '@solid/react';
import HomeView from './HomeView';
import NotLoginHome from './NotLoginHome';

const SelectView = () => {
    const webId = useWebId()
    return (webId) ? <HomeView /> : <NotLoginHome />;
}

export default SelectView;
