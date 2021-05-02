import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from "react-router-dom";

const Listas=({changeView})=>{
    return (
        <div>
            <List components='nav'>
            <ListItem button component={Link} to="/" >
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="User manager" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/about" >
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
            </List>
        </div>
    )
}

export default Listas;