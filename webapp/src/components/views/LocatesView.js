import React, { useState, useLayoutEffect } from 'react';
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

function LocatesView({ locates, webId }) {

    const [selectLocate, setSelectLocate] = useState(null);
    const [width] = useWindowSize();

    const accionSelectLocate = (id) => {
        setSelectLocate(id);
    };


    const classes = useStyles();

    return (
        <Grid container spacing={2} >
            <Grid container item xs={12} sm={9} md={6} spacing={0}>
                <Paper className={classes.paper}>
                    <Typography gutterBottom variant="h2" component="h2" color='inherit'>Locates</Typography>
                    <Typography component="p">
                        Click on one of your locates to see in the map
                            </Typography>
                    <LocatesList width={width} locates={locates} webId={webId} accionSelectLocate={accionSelectLocate} selectedLocate={selectLocate} />
                </Paper>
            </Grid>
            <Grid container item xs={12} sm={9} md={6} spacing={0}>
            <Typography variant="h2" component="h2">
                    Map
                            </Typography>
                <GoogleMapLocates selectedLocate={selectLocate} />
            </Grid>

        </Grid >


    );
}

export default LocatesView;