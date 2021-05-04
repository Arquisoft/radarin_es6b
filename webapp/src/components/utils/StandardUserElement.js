import React from "react";
import useProfile from "./Profile";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import UserRols from './UserRols';

const useStyles = makeStyles((theme) => ({
    mainPaper: {
        backgroundColor: '#FFFFFF',
        marginTop: '20px',
        elevation: '3',
        border: 'groove',
        borderRadius: '25px',
        borderColor: '#4B16EF',
        marginRight: '10px'
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
    },
    marginShoot: {
        marginTop: '5px'
    },
    margin: {
        marginTop: '5px',
        marginBottom: '10px',
        marginRight: '15px',
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    medio: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    espacios: {
        marginLeft: '15px',
        marginTop: '20px',
        marginBottom: '10px'
    }
}));
const StandardUserElement = ({ user, webId, deleteOneUser, userToAdmin }) => {
    const profile = useProfile(user.solidId);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.mainPaper} color="primary">
                <Grid container spacing={3}>
                    <div className={classes.espacios}>
                        <Grid item xs={2}>
                            <a href={user.solidId} ><Avatar className={classes.medio} name={profile.fullName} src={`${profile.imageSrc}`} /></a>
                        </Grid>
                    </div>

                    <div className={classes.espacios}>
                        <Grid item xs={6}>
                            <div>
                                <a href={user.solidId} > <Chip className={classes.margin}
                                    color="primary"
                                    label={`${profile.fullName}`}
                                /></a>
                            </div>
                            <div>
                                <Chip className={classes.margin}
                                    color="primary"
                                    label={"Latitud: " + user.latitud}
                                />
                            </div>
                            <div>
                                <Chip className={classes.margin}
                                    color="primary"
                                    label={"Longitud: " + user.longitud}
                                />
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Button className={classes.margin} variant="contained" color="primary" edge="end"
                                            onClick={() => {
                                                deleteOneUser(webId, user.solidId);
                                            }}
                                        >Delete</Button></td>
                                        <td><Button className={classes.margin} variant="contained" color="primary" edge="end"
                                            onClick={() => {
                                                userToAdmin(user.solidId, UserRols.ADMIN);
                                            }}
                                        >Make Admin</Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </div>
                </Grid>
            </Paper>
        </div >
    );

}

export default StandardUserElement;