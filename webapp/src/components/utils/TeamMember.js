import React from "react";
import useProfile from "./Profile";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
    marginStyle: {
        margin: 'auto',
        marginTop: '10px'
    }
}));

const TeamMember = ({ webId, githubURL }) => {

    const profile = useProfile(webId);

    const classes = useStyles();


    return (
        <div>
            <div className={classes.root} >
                <a className={classes.marginStyle} href={webId}>
                    <Avatar className={classes.large} name={profile.fullName} src={`${profile.imageSrc}`} />
                </a>
            </div>
            <div className={classes.root} >
                <a className={classes.marginStyle} href={webId}>
                    <Chip
                        color="primary"
                        label={`${profile.fullName}`}
                    />
                </a>
            </div>
            <div>
                <a className={classes.marginStyle} href={githubURL}>
                    <Button className={classes.marginStyle} variant="contained" color="primary" edge="end">Github profile</Button>
                </a>
            </div>
        </div>
    );

}

export default TeamMember;