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
                    <Typography gutterBottom variant="h5" component="h2">
                        About
          </Typography>
                    <Typography component="p">
                        Radarin is a system to facilitate meetings between friends using new
                        technologies. The application will be able to access your location if
                        you voluntarily have it activated. It will allow other users who are
                        your friends to know when you are nearby. You will be notified when
                        you have friends nearby so that you can get in touch. The application
                        will not store personal information but you will be asked for
                        permission to obtain the information needed.
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
