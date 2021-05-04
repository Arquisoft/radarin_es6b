import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TeamMember from '../utils/TeamMember';

const useStyles = makeStyles((theme) => ({
    media: {
        objectFit: 'contain'
    },
    parrafoEnLinea: {
        display: 'inline'
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 260,
        width: 180,
    },
    control: {
        padding: theme.spacing(2),
    },
    center: {
        textAlign: 'center',
        alignContent: 'center'
    }
}));

function AboutView() {
    const team = [
        {
            //Adrian
            solidId: "https://uo265336.inrupt.net/profile/card#me",
            githubURL: "https://github.com/UO265336"
        },
        {
            //Pablo
            solidId: "https://uo271246.inrupt.net/profile/card#me",
            githubURL: "https://github.com/uo271246"
        },
        {
            //Candela
            solidId: "https://uo269948.inrupt.net/profile/card#me",
            githubURL: "https://github.com/uo269948"
        },
        {
            //monica
            solidId: "https://monica2499.inrupt.net/profile/card#me",
            githubURL: "https://github.com/MonicaViPo"
        },
        {
            //Fernando
            solidId: "https://fernandogiganto.inrupt.net/profile/card#me",
            githubURL: "https://github.com/FernandoGiganto"
        },
        {
            //Raul
            solidId: "https://raulag.inrupt.net/profile/card#me",
            githubURL: "https://github.com/UO270656"
        }];


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
                        with Solid, also giving permission to use this personal information .
                        </Typography>
                    <Typography component="p" className={classes.parrafoEnLinea}>
                        You can see the documentation of the application by clicking
                    </Typography>
                    <a id="doc" href="https://radarines6bwebapp.herokuapp.com/docs/"> here.</a>
                </CardContent>
            </Card>
        </Grid>
        <Grid container item xs={12} sm={9} md={6} spacing={0} justify="center"
            alignItems="stretch"
            direction="column">
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                        The team
                    </Typography>

                    <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={3}>
                                {[0, 1, 2].map((value) => (
                                    <Grid key={value} item>
                                        <Paper className={classes.paper} elevation={3}>
                                            <TeamMember webId={team[value].solidId} githubURL={team[value].githubURL} ></TeamMember>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={3}>
                                {[3, 4, 5].map((value) => (
                                    <Grid key={value} item>
                                        <Paper className={classes.paper} elevation={3}>
                                            <TeamMember webId={team[value].solidId} githubURL={team[value].githubURL} ></TeamMember>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>;
}

export default AboutView;