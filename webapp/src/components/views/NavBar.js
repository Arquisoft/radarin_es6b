import React,{useState,useLayoutEffect} from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core/';
import GetProfile from '../utils/GetProfile'
import { LoggedIn } from '@solid/react';
import LogoRadarin from '../img/LogoRadarin.png';
import logo from '../img/logo.svg';
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


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}


const NavBar = (props) => {

    const classes = useStyles();

    const [width] = useWindowSize();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <div className={classes.title} align="left">
                    <img id="img" src={logo} alt="logo" height="50" />
                    {
                        width > 800 ? <img id="img" src={LogoRadarin} alt="logo-Texto" height="50" /> : null
                    }
                </div>
                <LoggedIn>
                    <TemporaryDrawer changeView={props.changeView} isAdmin={props.isAdmin} />
                </LoggedIn>
                <GetProfile />
            </Toolbar>
        </AppBar >
    );
}


export default NavBar;