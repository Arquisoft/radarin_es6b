import React from 'react'

import Button from "@material-ui/core/Button";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TeamMember from '../utils/team/TeamMember';
import LogoRadarin from '../img/LogoRadarin.png';
import logo from '../img/logo.png';
import documentation from '../img/documentation.png';
import engeniaring from '../img/engeniaring.png';
import resize from '../img/resize.png';
import uniovi from '../img/uniovi.png';
import thinking from '../img/thinking.png';
import RadarinMobile from '../img/RadarinMobile.png';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RedirectIcon from '@material-ui/icons/CallMissedOutgoing';
import GitHubIcon from '@material-ui/icons/GitHub';
import DocumentationIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
    media: {
        objectFit: 'contain',
        marginTop: '10px'
    },
    imgTeam: {
        objectFit: 'contain',
        marginTop: '10px',
        width: '120',
        height: '200'
    },
    imgUniovi: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    parrafoEnLinea: {
        display: 'inline'
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 260,
        width: 200,
    },
    control: {
        padding: theme.spacing(2),
    },
    center: {
        textAlign: 'center',
        alignContent: 'center'
    },
    insidePape: {
        elevation: '3',
        marginTop: '20px',
    },
    finalButton: {
        marginTop: '10px',
        marginBottom: '10px'
    },
    play: {
        marginLeft: '5px'
    }
}));

const NotLoginHome = () => {
    const classes = useStyles();

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

    return <Grid id="grid1" container spacing={3}>
        <Grid container item xs={12} >
            <Card id="card1">
                <CardMedia
                    component="img"
                    height="70"
                    className={classes.media}
                    alt="Radarin Logo"
                    image={LogoRadarin}
                />
                <CardContent>
                    <Typography component="p">
                        Radarin is a system to facilitate meetings between friends using new
                        technologies. The application will be able to access your location if
                        you voluntarily have it activated. It will allow other users who are
                        your friends to know when you are nearby. You will be notified when
                        you have friends nearby so that you can get in touch. The application
                        will not store personal information but you will be asked for
                        permission to obtain the information needed.
                        </Typography>
                    <Button id="but1"className={classes.finalButton} variant="contained" color="primary" edge="end" >View the trailer <PlayArrowIcon className={classes.play} /></Button>
                </CardContent>
            </Card>
        </Grid>

        <Grid id="grid2" container item xs={12} sm={9} md={6} spacing={0}>
            <Card>
                <CardMedia
                    component="img"
                    height="70"
                    className={classes.media}
                    alt="Solid Logo"
                    image="https://solid.mit.edu/assets/img/solid-logo.svg"
                />
                <CardContent>
                    <Paper className={classes.insidePape}>
                        <Typography gutterBottom variant="h5" component="h2">
                            What is Solid?
                    </Typography>
                        <Typography component="p">
                            Solid is an exciting new project led by Prof. Tim Berners-Lee,
                            inventor of the World Wide Web, taking place at MIT. The project
                            aims to radically change the way Web applications work today,
                            resulting in true data ownership as well as improved privacy.
                    </Typography>
                        <a href="https://solid.mit.edu/"><Button id="but2" className={classes.finalButton} variant="contained" size="small" color="primary" edge="end" >Learn more <RedirectIcon className={classes.play} /></Button></a>

                    </Paper>
                    <Paper className={classes.insidePape}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Don't have a profile, yet?
                    </Typography>
                        <Typography component="p">
                            You can create your own solid account at the following link:
                    </Typography>

                        <a href="https://solidcommunity.net/register"><Button id="but2" className={classes.finalButton} variant="contained" size="small" color="primary" edge="end" >Get a profile <RedirectIcon className={classes.play} /></Button></a>

                    </Paper>
                </CardContent>
            </Card>
        </Grid>
        <Grid id="grid3" container item xs={12} sm={9} md={6} spacing={0}>
            <Paper>
                <Typography gutterBottom variant="h3" component="h3">
                    About Radarin
                    </Typography>
                <Grid container justify="center" spacing={4}>
                    <Grid item xs={6}>
                        <img id="img1" alt="logo-radain" src={logo} width={100} height={100} />
                        <CardContent>

                            <Typography component="p">
                                Radarin is an application to get your ubication
                                and see who of your solid friend's is near to you. You can also create locates to save your favourite places.
                                </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                        <img alt="resize-radain" src={resize} width={100} height={100} />
                        <CardContent>

                            <Typography component="p">
                                The website can be used from different devices such as computers or mobiles since it is resizable.
                                </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                        <img alt="Think-radain" src={thinking} width={100} height={100} />
                        <CardContent>

                            <Typography component="p">
                                Radarin is a simple and intuitive page for the use of users unfamiliar with technology
                                </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                        <img alt="Ubication-radain" src={RadarinMobile} width={100} height={100} />
                        <CardContent>

                            <Typography component="p">
                                The application of functionality to see your friends, see their last connection to the application, their last location and view their profile in solid. You can also create, update and delete locations.                                </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>


        <Grid id="grid4" container item xs={12}>
            <Grid container justify="center" spacing={3}>
                <Grid item>
                    <Card>
                        <CardMedia
                            component="img"
                            height="70"
                            className={classes.media}
                            alt="Solid Logo"
                            image="https://solid.mit.edu/assets/img/solid-logo.svg"
                        />
                        <CardContent>

                            <Typography component="p">
                                Go to the solid proyect:
                    </Typography>
                            <a href="https://solidproject.org"><Button id="but3"className={classes.finalButton} variant="contained" size="small" color="primary" edge="end" >Solid Page <RedirectIcon className={classes.play} /></Button></a>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>

                    <Card>

                        <CardMedia
                            component="img"
                            height="70"
                            className={classes.media}
                            alt="Radarin Logo"
                            image={logo}
                        />
                        <CardContent>

                            <Typography component="p">
                                Go to the github proyect:
                    </Typography>

                            <a href="https://github.com/Arquisoft/radarin_es6b"><Button id="but4"className={classes.finalButton} variant="contained" size="small" color="primary" edge="end" >Github proyect <GitHubIcon className={classes.play} /></Button></a>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <img className={classes.finalButton} alt="documentation-radarin" src={documentation} width={60} height={60} />
                        <CardContent>
                            <Typography component="p">
                                Go to the documentation:
                    </Typography>
                            <a id="doc" href="https://radarines6bwebapp.herokuapp.com/docs/"><Button className={classes.finalButton} variant="contained" size="small" color="primary" edge="end" >Documentation <DocumentationIcon className={classes.play} /></Button></a>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>

        <Grid id="grid5"container item xs={12}>
            <Grid container justify="center" spacing={1}>
                <Card id="card2">
                    <Typography gutterBottom variant="h3" component="h3">
                        Engeniaring team
                    </Typography>
                    <img className={classes.finalButton} alt="engeniaring-radarin" src={engeniaring} width={300} height={200} />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h6">
                            The team that has developed the web page in the ASW subject of the university of oviedo of infoematic engineering in 2021:
                                        </Typography>
                        <img className={classes.imgUniovi} alt="uniovi-radarin" src={uniovi} width={120} height={80} />

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
        </Grid>
    </Grid>;
}

export default NotLoginHome;