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
    const [standarUsers, setStandarUsers] = useState([]);

    //Locates of current user
    const [locates, setLocates] = useState([]);

    const [radio, setRadio] = useState(50);
    const [cuurentUser, setCurrentUser]=useState(null);


    const changeRadio = (valor) => {
        setRadio(valor);
    }

    const changeTypeOfUser = (valor) => {
        setIsAdmin(valor);
    }


    var getLocatesOfUser = useCallback(async function () {
        if (webId) {
            getLocates().then(response => {
                setLocates(response);
            }).catch(err => console.log(err));
        }
    }, [setLocates, webId]);

    var checkRol = useCallback(async function () {
        if (users && users.length > 0) {
            const current = users.filter(user => user.solidId === webId);
            const currentUserLocal = current[0];
            if (currentUserLocal) {
                if (currentUserLocal.rol === roles.ADMIN) {
                    setIsAdmin(true);
                }
                else {
                    setIsAdmin(false);
                }
                setCurrentUser(currentUserLocal)
            }
        }
    }, [setIsAdmin,setCurrentUser, users, webId]);

    useEffect(() => {
        if (!listening) {
            const events = new EventSource(getEventsURL());

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                const text = parsedData.text;
                if (text) {
                    if (text === "change User list") {
                        getStandardUsers().then(response => {
                            const standar = response.filter(user => user.rol === roles.STANDAR);
                            setUsers(response);
                            setStandarUsers(standar);
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
        //get locates
        getLocatesOfUser();

        checkRol();

    }, [getLocatesOfUser, checkRol, listening]);


    return (<div id="login" className={classes.root}>
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
                                    <Route path="/" exact ><UserMagangerView users={standarUsers} webId={webId} changeTypeOfUser={changeTypeOfUser} /></Route>
                                    <Route path="/about" exact><AboutView /></Route>
                                    <Route path="/*"><Redirect to="/" /></Route>
                                </Switch>
                            </div>
                        </Router>
                        :


                        <Router>
                            <NavBar isAdmin={isAdmin} />
                            <Notifications users={standarUsers.filter(user => user.solidId !== webId)} webId={webId} radio={radio} user={cuurentUser} />
                            <ReactNotification />
                            <div className={classes.content}>
                                <div className={classes.toolbar}>
                                </div>
                                <Switch>
                                    <Route path="/" exact ><HomeView webId={webId} users={standarUsers.filter(user => user.solidId !== webId)} locates={locates.filter(locate => locate.solidId === webId)} changeRadio={changeRadio} radio={radio} user={cuurentUser}/></Route>
                                    <Route path="/friends" exact><FriendsView users={standarUsers.filter(user => user.solidId !== webId)} /></Route>
                                    <Route path="/locates" exact ><LocatesView locates={locates.filter(locate => locate.solidId === webId)} /></Route>
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