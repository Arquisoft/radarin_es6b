import React from "react";
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    flex: {
      position: 'flex',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));

const ProfileImage = ({ fullName, imageSrc}) => {
    const classes = useStyles();

    return (<Tooltip title={`${fullName}`} aria-label="user" className={classes.flex}>
            <Chip
            color="primary"  
            avatar={<Avatar name={fullName} src={imageSrc}/>}
            label={fullName ? `${fullName}` : 'Usuario'}
        />
    </Tooltip>
    );
};
export default ProfileImage;