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

const Listas=({changeView})=>{
    return (
        <div>
            <List components='nav'>
            <ListItem button component="a" onClick={()=>{changeView(0)}}>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="User manager" />
                </ListItem>
                <Divider />
                <ListItem button component="a" onClick={()=>{changeView(1)}}>
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