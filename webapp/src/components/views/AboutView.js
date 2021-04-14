import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    media: {
        objectFit: 'contain'
    },
    parrafoEnLinea:{
        display: 'inline'
    }
}));

function AboutView() {
    const classes = useStyles();

    return <Grid container spacing={3} alignItems="center" justify="center" direction="column">
        <Grid container item xs={12} sm={9} md={6} spacing={0} justify="center"
            alignItems="stretch"
            direction="column">
            <Card>
                <CardMedia
                    component="img"
                    height="70"
                    className={classes.media}
                    alt="Solid Logo"
                    image="https://solid.mit.edu/assets/img/solid-logo.svg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        About
          </Typography>
                    <Typography component="p">
                    Radarin is a system that can be used to make your location known to your 
                    friends, and know their locations as well, as long as you give the application 
                    permission. We can also store and delete personal marks on the map and add a name
                     to them to save the location of other places. User data is stored using data decentralization 
                     with Solid, also giving permission to use this personal information.
                        </Typography>
                    <Typography component="p" className={classes.parrafoEnLinea}>
                    You can see the documentation of the application by clicking
                    </Typography>
                    <a id="doc" href="https://radarines6bwebapp.herokuapp.com/docs/"> here.</a>
                </CardContent>
            </Card>
        </Grid>
    </Grid>;
}

export default AboutView;