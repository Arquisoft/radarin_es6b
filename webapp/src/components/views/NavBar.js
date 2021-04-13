import React from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core/';
import GetProfile from '../utils/GetProfile'
import { LoggedIn } from '@solid/react';
import LogoRadarin from '../img/LogoRadarin.png';
import TemporaryDrawer from '../utils/TemporaryDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        flexGrow: 1
    },

    title: {
        flexGrow: 1
    },
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        marginLeft: 240,
    },
}));

const NavBar = (props) => {

    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <div className={classes.title} align="left">
                    <img src={LogoRadarin} alt="logo-Texto" height="50" />
                </div>
                <LoggedIn>
                    <TemporaryDrawer />
                </LoggedIn>
                <GetProfile />
            </Toolbar>
        </AppBar >
    );
}


export default NavBar;