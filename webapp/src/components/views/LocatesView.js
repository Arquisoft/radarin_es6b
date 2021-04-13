import React, { useState } from 'react';
import { Typography } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapLocates from '../utils/GoogleMapLocates';
import LocatesList from '../utils/LocatesList';

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
function LocatesView() {

    const [selectLocate, setSelectLocate] = useState(null);

    const accionSelectLocate = (id) => {
        setSelectLocate(id);
    };


    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={3} alignItems="center" justify="center" direction="column">
                    <Grid container item xs={12} sm={9} md={6} spacing={0} alignItems="center" justify="center" direction="column">
                        <Paper className={classes.paper}>
                            <Typography component="p">
                                Click on one of your locates to see in the map
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid container item xs={12} sm={9} md={6}>
                        <Paper className={classes.paper}>
                            <Typography gutterBottom variant="h2" component="h2" color='inherit'>Locates</Typography>
                            <LocatesList accionSelectLocate={accionSelectLocate} />
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} sm={9} md={6}>
                        <Paper className={classes.paper}>
                            <Typography gutterBottom variant="h2" component="h2" color='inherit'>Map</Typography>
                            <GoogleMapLocates selectedLocate={selectLocate} />
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        </React.Fragment >
    );
}

export default LocatesView;