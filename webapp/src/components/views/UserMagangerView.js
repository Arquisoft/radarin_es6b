import React from 'react';
import { Typography } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import UsersList from '../utils/UsersList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));
function UserManagerView({users}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={3} alignItems="center" justify="center" direction="column">
                    <Grid container item xs={12} sm={9} md={6} spacing={0} justify="center"
                        alignItems="stretch"
                        direction="column">
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h2" component="h2">
                                    Users list
                             </Typography>
                                <UsersList users={users} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </div>
        </React.Fragment >
    );
}

export default UserManagerView;