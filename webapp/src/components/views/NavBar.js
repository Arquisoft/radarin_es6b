import React,{useEffect, useState} from 'react';
import { AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core/';
import GetProfile from '../utils/GetProfile'
import { LoggedIn } from '@solid/react';
import MenuIcon from '@material-ui/icons/Menu';

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

function NavBar(props){

    const classes = useStyles();
    const [width,setWidth]=useState(window.screen.width);

    useEffect(()=>{
        setWidth(window.screen.width);
    },[width]);

    return (
        <AppBar className={classes.appBar}>
            <Toolbar id="toolbar">
                <div className={classes.title} align="left">
                   
                    <img id="img" src="/img/LogoRadarin.png" alt="logo-Texto" height="50" />
                </div>

                <LoggedIn>
                    <IconButton aria-label="menu" className={classes.menuButton} color="inherit" onClick={() => props.accionAbrir()}>
                        <MenuIcon />
                    </IconButton>
                </LoggedIn>
                <GetProfile />
            </Toolbar>
        </AppBar >
    );
}


export default NavBar;