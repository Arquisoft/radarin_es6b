import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../../views/NavBar';
import {
    makeStyles
} from '@material-ui/core';
import HomeView from '../../views/HomeView';
import LocatesView from '../../views/LocatesView';
import FriendsView from '../../views/FriendsView';
import AboutView from '../../views/AboutView';
import UserMagangerView from '../../views/UserMagangerView';
import NotLoginHome from '../../views/NotLoginHome';
import roles from '../user/roles/UserRols';
import { getStandardUsers, getEventsURL, getLocates } from '../../../api/api';
import { BeatLoader } from 'react-spinners';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LoggedIn, LoggedOut } from '@solid/react';
import Notifications from '../user/notifications/FriendsNotifications';
import ReactNotification from "react-notifications-component";

const estilos = makeStyles(theme => ({

    root: {
        display: "flex"
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    spinner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));




const Contenedor = ({ webId }) => {

    const classes = estilos();




    //Type of the user
    const [isAdmin, setIsAdmin] = useState(null);

    //Listening servlet events
    const [listening, setListening] = useState(false);

    //standar user list (include the current user)
    const [users, setUsers] = useState([]);

    const [usersWithoutCurrent, setUsersWithoutCurrent] = useState([]);

    //Locates of current user
    const [locates, setLocates] = useState([]);



    const changeTypeOfUser = (valor) => {
        setIsAdmin(valor);
    }

    var getUsers = useCallback(async function () {
        if (webId) {
            getStandardUsers().then(response => {
                const withoutCurrent = response.filter(user => user.solidId !== webId && user.rol === roles.STANDAR);
                const withCurrent = response.filter(user => user.rol === roles.STANDAR);
                const current = (response.filter(user => user.solidId === webId));
                if (current[0]) {
                    const setCurrentUser = current[0];
                    if (setCurrentUser.rol === roles.ADMIN) {
                        setIsAdmin(true);
                    }
                    else {
                        setIsAdmin(false);
                    }
                }

                setUsers(withCurrent);
                setUsersWithoutCurrent(withoutCurrent);
            }).catch(err => console.log(err));
        }
    }, [setUsers, webId]);

    var getLocatesOfUser = useCallback(async function () {
        if (webId) {
            getLocates().then(response => {
                setLocates(response);
            }).catch(err => console.log(err));
        }
    }, [setLocates, webId]);


    useEffect(() => {
        if (!listening) {
            const events = new EventSource(getEventsURL());

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                const text = parsedData.text;
                if (text) {
                    if (text === "change User list") {
                        getStandardUsers().then(response => {

                            const withoutCurrent = response.filter(user => user.solidId !== webId && user.rol === roles.STANDAR);
                            const withCurrent = response.filter(user => user.rol === roles.STANDAR);
                            const current = (response.filter(user => user.solidId === webId));
                            if (current[0]) {
                                const setCurrentUser = current[0];
                                if (setCurrentUser.rol === roles.ADMIN) {
                                    setIsAdmin(true);
                                }
                                else {
                                    setIsAdmin(false);
                                }
                            }

                            setUsers(withCurrent);
                            setUsersWithoutCurrent(withoutCurrent);
                        }).catch(err => console.log(err));

                    }
                    else if (text === "change Locate list") {
                        if (parsedData.webId) {
                            getLocates().then(response => {
                                setLocates(response);
                            }).catch(err => console.log(err));
                        }

                    }
                }
            };

            setListening(true);
        }

        //Get standar standard
        getUsers();

        //get locates
        getLocatesOfUser();

    }, [getUsers, getLocatesOfUser, listening, webId]);


    return (<div className={classes.root}>
        <LoggedIn>
            {
                (isAdmin !== null) ?
                    (isAdmin ?
                        <Router>
                            <NavBar isAdmin={isAdmin} />
                            <div className={classes.content}>
                                <div className={classes.toolbar}>
                                </div>
                                <Switch>
                                    <Route path="/" exact ><UserMagangerView users={users} webId={webId} changeTypeOfUser={changeTypeOfUser} /></Route>
                                    <Route path="/about" exact><AboutView /></Route>
                                    <Route path="/*"><Redirect to="/" /></Route>
                                </Switch>
                            </div>
                        </Router>
                        :


                        <Router>
                            <NavBar isAdmin={isAdmin} />
                            <Notifications users={usersWithoutCurrent} webId={webId} />
                            <ReactNotification />
                            <div className={classes.content}>
                                <div className={classes.toolbar}>
                                </div>
                                <Switch>
                                    <Route path="/" exact ><HomeView webId={webId} users={usersWithoutCurrent} locates={locates.filter(locate=> locate.solidId===webId)} /></Route>
                                    <Route path="/friends" exact><FriendsView users={usersWithoutCurrent} /></Route>
                                    <Route path="/locates" exact ><LocatesView locates={locates.filter(locate=> locate.solidId===webId)} /></Route>
                                    <Route path="/about" exact ><AboutView /></Route>
                                    <Route path="/*"><Redirect to="/" /></Route>
                                </Switch>
                            </div>
                        </Router>
                    )
                    :
                    <BeatLoader loading></BeatLoader>
            }
        </LoggedIn>
        <LoggedOut>
            <Router>
                <NavBar isAdmin={isAdmin} />
                <div className={classes.content}>
                    <div className={classes.toolbar}>
                    </div>
                    <Switch>
                        <Route path="/" exact><NotLoginHome /></Route>
                        <Route path="/*"><Redirect to="/" /></Route>
                    </Switch>
                </div>
            </Router>
        </LoggedOut>
    </div>);

};

export default Contenedor;