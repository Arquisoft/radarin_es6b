import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RoomIcon from '@material-ui/icons/Room';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";

const Listas=({changeView})=>{
    return (
        <div>
            <List components='nav'>
            <ListItem button component={Link} to="/" >
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/locates" >
                    <ListItemIcon>
                        <RoomIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Locates" />
                </ListItem>
                <ListItem button component={Link} to="/friends" >
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Friends" />
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