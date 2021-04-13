import React from 'react';
import NavBar from '../views/NavBar';
import {
    makeStyles
} from '@material-ui/core';
import HomeView from '../views/HomeView';
import LocatesView from '../views/LocatesView';
import FriendsView from '../views/FriendsView';
import AboutView from '../views/AboutView';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useWebId} from '@solid/react';
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

    return (
        <div className={classes.root}>
            <NavBar />
            <div className={classes.content}>
                <div className={classes.toolbar}>
                </div>
                {webId ?
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomeView} />
                        <Route exact path="/locates" component={LocatesView} />
                        <Route exact path="/Friends" component={FriendsView} />
                        <Route exact path="/about" component={AboutView} />
                    </Switch>
                </Router>
                :
                <NotLoginHome />
                }
            </div>
        </div>
    )
};

export default Contenedor;