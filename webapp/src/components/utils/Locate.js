import React from "react";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import icon from '../img/locatePin.png';

const Locate = ({locate,accionSelectLocate}) => {

        return (
            <div style={{ marginTop: '10px ' }} >
                <Chip
                    color="primary"
                    avatar={<Avatar name={locate.texto} src={icon} />}
                    label={locate.texto}
                    onClick={() => accionSelectLocate(locate)}
                    />               
            </div >
        );
}

export default Locate;