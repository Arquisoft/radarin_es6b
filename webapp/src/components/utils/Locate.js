import React from "react";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import icon from '../img/locatePin.png';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px'
    },
    mainPaper: {
        backgroundColor: '#FFFFFF',
        marginTop: '20px',
        elevation: '3',
        border: 'groove',
        borderRadius: '25px',
        borderColor: '#4B16EF',
        marginRight: '10px'
    },

}));
const Locate = ({ locate, accionSelectLocate, deleteLocalLocate, updateLocalLocate }) => {

    const classes = useStyles();
    return (
        <div style={{ marginTop: '10px ', display: 'inline-flex' }} >
            <Paper className={classes.mainPaper} color="primary">
                <Chip
                    color="primary"
                    avatar={<Avatar name={locate.texto} src={icon} />}
                    label={locate.texto}
                    onClick={() => accionSelectLocate(locate)}
                />
                <Button className={classes.margin} size='small' variant="contained" color="primary" edge="end"
                    onClick={() => {
                        deleteLocalLocate(locate._id, locate.solidId);
                    }}
                >Delete</Button>

                <Button className={classes.margin} size='small' variant="contained" color="primary" edge="end" onClick={() => {
                    updateLocalLocate(locate);
                }}>Update</Button>
            </Paper>
        </div >
    );
}

export default Locate;