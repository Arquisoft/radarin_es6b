import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../views/NavBar';
import {
    makeStyles
} from '@material-ui/core';
import HomeView from '../views/HomeView';
import LocatesView from '../views/LocatesView';
import FriendsView from '../views/FriendsView';
import AboutView from '../views/AboutView';
import UserMagangerView from '../views/UserMagangerView';
import { useWebId } from '@solid/react';
import NotLoginHome from '../views/NotLoginHome';
import roles from './UserRols';
import { getUserByWebId, getStandardUsers, getEventsURL, getLocatesByWebId } from '../../api/api';

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

    // webId of current user
    const webId = useWebId();



    //Selected view
    const [selectedView, setSelectedView] = useState(0);

    //Type of the user
    const [isAdmin, setIsAdmin] = useState(false);

    //Listening servlet events
    const [listening, setListening] = useState(false);

    //standar user list (include the current user)
    const [users, setUsers] = useState([]);

    const [usersWithoutCurrent, setUsersWithoutCurrent] = useState([]);

    //Locates of current user
    const [locates, setLocates] = useState([]);



    const changeView = (num) => {
        setSelectedView(num);
    }

    var isUserAdmin = useCallback(async function () {
        if (webId) {
            getUserByWebId(webId).then(user => {
                if (user != null) {
                    if (user.rol === roles.ADMIN) {
                        setIsAdmin(true);
                    }
                    else {
                        setIsAdmin(false);
                    }
                }
                else {
                    setIsAdmin(false);
                }
            }).catch(err => console.log(err));
        }
        else {
            setIsAdmin(false);
        }
    }, [webId]);

    var getUsers = useCallback(async function () {
        if (webId) {
            getStandardUsers().then(response => {
                const withoutCurrent = response.filter(user => user.solidId !== webId);
                setUsers(response);
                setUsersWithoutCurrent(withoutCurrent);
            }).catch(err => console.log(err));
        }
    }, [setUsers, webId]);

    var getLocatesOfUser = useCallback(async function () {
        if (webId) {
            getLocatesByWebId(webId).then(response => {
                setLocates(response);
            }).catch(err => console.log(err));
        }
    }, [setLocates, webId]);

    const getSelectedView = function () {
        var view = null;
        switch (selectedView) {
            case 0:
                if (isAdmin) {
                    view = <UserMagangerView users={users} />;
                }
                else {
                    view = <HomeView users={usersWithoutCurrent} locates={locates} />;
                }
                break;

            case 1:
                if (isAdmin) {
                    view = <AboutView />;
                }
                else {
                    view = <LocatesView locates={locates} />;
                }
                break;

            case 2:
                if (isAdmin) {
                    view = null;
                }
                else {
                    view = <FriendsView users={usersWithoutCurrent} />;
                }
                break;

            case 3:
                if (isAdmin) {
                    view = null;
                }
                else {
                    view = <AboutView />;
                }
                break;

            default:
                if (isAdmin) {
                    view = <UserMagangerView users={users} />;
                }
                else {
                    view = <HomeView users={usersWithoutCurrent} locates={locates} />;
                }
                break;
        }

        return view;
    };


    useEffect(() => {
        if (!listening) {
            const events = new EventSource(getEventsURL());

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                const text = parsedData.text;
                if (text) {
                    if (text === "change User list") {
                        getStandardUsers().then(response => {
                            const withoutCurrent = response.filter(user => user.solidId !== webId)
                            setUsers(response);
                            setUsersWithoutCurrent(withoutCurrent);
                        }).catch(err => console.log(err));

                    }
                    else if (text === "change Locate list") {
                        if (parsedData.webId) {
                            console.log("locate cambio")
                            getLocatesByWebId(parsedData.webId).then(response => {
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

        //Check type of user
        isUserAdmin();

    }, [isUserAdmin, getUsers, getLocatesOfUser, listening, webId]);

    if (webId) {
        return (
            <div className={classes.root}>
                <NavBar changeView={changeView} isAdmin={isAdmin} />
                <div className={classes.content}>
                    <div className={classes.toolbar}>
                    </div>
                    {
                       (users && locates)? getSelectedView():null
                    }

                </div>
            </div>
        );

    } else {
        return (
            <div className={classes.root}>
                <NavBar changeView={changeView} isAdmin={isAdmin} />
                <div className={classes.content}>
                    <div className={classes.toolbar}>
                    </div>
                    <NotLoginHome />
                </div>
            </div>
        );
    }

};

export default Contenedor;