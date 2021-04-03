import React from 'react'

import Button from "@material-ui/core/Button";

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
}));

const NotLoginHome = () => {
    const classes = useStyles();
    
    return <Grid container spacing={3} alignItems="center" justify="center" direction="column">
        <Grid container item xs={12} sm={9} md={6} spacing={0} justify="center"
            alignItems="stretch"
            direction="column">
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Welcome to Radarin_es6b
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
                </CardContent>
            </Card>
        </Grid>

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
                        What is Solid?
          </Typography>
                    <Typography component="p">
                        Solid is an exciting new project led by Prof. Tim Berners-Lee,
                        inventor of the World Wide Web, taking place at MIT. The project
                        aims to radically change the way Web applications work today,
                        resulting in true data ownership as well as improved privacy.
          </Typography>
                    <Button size="small" color="primary" component="a" href="https://solid.mit.edu/">
                        Learn More
          </Button>
                    <Typography gutterBottom variant="h5" component="h2">
                        Don't have a profile, yet?
          </Typography>
                    <Typography component="p">
                        You can create your own solid account at the following link:
          </Typography>
                    <Button size="small" color="primary" component="a" href="https://solidcommunity.net/register">
                        Get a profile</Button>
                </CardContent>
            </Card>
        </Grid>
    </Grid>;
}

export default NotLoginHome;
