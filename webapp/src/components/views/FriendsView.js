import React, { useState, useLayoutEffect } from 'react';
import { Typography } from '@material-ui/core/';
import { useWebId } from '@solid/react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapFriends from '../utils/GoogleMapFriends';
import FriendListEvaluate from '../utils/FriendsListEvaluate';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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

function FriendsView({ users }) {

    const webId = useWebId();
    const [selectFriend, setSelectFriend] = useState(null);
    const [width] = useWindowSize();

    const accionSelectFriend = (id) => {
        setSelectFriend(id);
    };


    const classes = useStyles();

    return (

        <Grid container spacing={2} >
            <Grid container item xs={12} sm={9} md={6} spacing={0}>
                <Paper className={classes.paper}>
                    <Typography gutterBottom variant="h2" component="h2" color='inherit'>Friends</Typography>
                    <Typography component="p">
                        Click on one of your friends to see his last location
                            </Typography>
                    <FriendListEvaluate webId={webId} width={width} users={users} accionSelectFriend={accionSelectFriend} />
                </Paper>
            </Grid>
            <Grid container item xs={12} sm={9} md={6} spacing={0}>
                <Typography variant="h2" component="h2">
                    Map
                            </Typography>
                <GoogleMapFriends selectedFriend={selectFriend} />
            </Grid>
        </Grid>
    );
}

export default FriendsView;