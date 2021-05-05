import React from 'react';
import { Typography } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import UsersList from '../utils/user/UsersList';
import Button from "@material-ui/core/Button";
import UserRols from '../utils/user/roles/UserRols';
import { changeRol } from '../../api/api';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));
function UserManagerView({ users, webId, changeTypeOfUser }) {
    const classes = useStyles();

    const userToAdmin = async function (solidId, rol) {
        try {
            await changeRol(solidId, rol);

            if(rol===UserRols.STANDAR){
                changeTypeOfUser(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={3} alignItems="center" justify="center" direction="column">
                    <Grid container item xs={12} sm={9} md={6} spacing={0} justify="center"
                        alignItems="stretch"
                        direction="column">
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h6">
                                    To stop being an administrator click here
                             </Typography>
                                <Button className={classes.margin} variant="contained" color="primary" edge="end"
                                    onClick={() => {
                                        userToAdmin(webId, UserRols.STANDAR);
                                    }}
                                >Be a standard user</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid container item xs={12} sm={9} md={6} spacing={0} justify="center"
                        alignItems="stretch"
                        direction="column">
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h2" component="h2">
                                    Users list
                             </Typography>
                                <UsersList users={users} userToAdmin={userToAdmin} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </div>
        </React.Fragment >
    );
}

export default UserManagerView;