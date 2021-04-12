import React, { useState } from 'react';
import { Typography } from '@material-ui/core/';
import { useWebId } from '@solid/react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import MyGoogleMap from '../utils/GoogleMapFriends';
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
function FriendsView() {

    const webId = useWebId();
    const [selectFriend,setSelectFriend]=useState(null);



    const accionSelectFriend = (id) => {
        setSelectFriend(id);
    };


    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid container item xs={12} justify="center" >
                        <Paper className={classes.paper}>
                            <Typography component="p">
                                Click on one of your friends to see his last location
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid container item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography gutterBottom variant="h2" component="h2" color='inherit'>Friends</Typography>
                            <FriendListEvaluate webId={webId} accionSelectFriend={accionSelectFriend} />
                        </Paper>
                    </Grid>
                    <Grid container item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography gutterBottom variant="h2" component="h2" color='inherit'>Map</Typography>
                            <MyGoogleMap selectedFriend={selectFriend} />
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        </React.Fragment >
    );
}

export default FriendsView;