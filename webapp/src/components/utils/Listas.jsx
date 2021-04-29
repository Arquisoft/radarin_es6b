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

const Listas=({changeView})=>{
    return (
        <div>
            <List components='nav'>
                <ListItem button component="a" onClick={()=>{changeView(0)}}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component="a" onClick={()=>{changeView(1)}}>
                    <ListItemIcon>
                        <RoomIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Locates" />
                </ListItem>
                <ListItem button component="a" onClick={()=>{changeView(2)}}>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Friends" />
                </ListItem>
                <Divider />
                <ListItem button id="buttonAbout" component="a" onClick={()=>{changeView(3)}}>
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