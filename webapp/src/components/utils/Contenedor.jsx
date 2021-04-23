import React, { useState } from 'react';
import NavBar from '../views/NavBar';
import {
    makeStyles
} from '@material-ui/core';
import HomeView from '../views/HomeView';
import LocatesView from '../views/LocatesView';
import FriendsView from '../views/FriendsView';
import AboutView from '../views/AboutView';
import { useWebId } from '@solid/react';
import NotLoginHome from '../views/NotLoginHome';



const estilos = makeStyles(theme => ({

    root: {
        display: "flex"
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));




const Contenedor = () => {

    const classes = estilos();
    const webId = useWebId()
    const views = [<HomeView />, <LocatesView />, <FriendsView />, <AboutView />];
    const [selectedView, setSelectedView] = useState(0);

    const changeView = (num) => {
        setSelectedView(num);
    }

    return (
        <div className={classes.root}>
            <NavBar changeView={changeView} />
            <div className={classes.content}>
                <div className={classes.toolbar}>
                </div>
                {webId ?
                    views[selectedView]
                    :
                    <NotLoginHome />
                }
            </div>
        </div>
    )
};

export default Contenedor;