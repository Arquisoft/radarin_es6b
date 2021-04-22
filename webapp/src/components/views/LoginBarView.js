import React from 'react';
import Button from "@material-ui/core/Button";

import {AuthButton, LoggedIn} from '@solid/react';
import ProfileImage from '../utils/ProfileImage';

export const AuthButtonComponent = React.forwardRef((props, ref) => 
<span ref={ref}><AuthButton {...props} />
    <div 
        style={{display: 'none'}}>{props.children}
    </div>
</span>)

const LoginBarView= ({fullName, imageSrc, webId}) => {    
    return <div>
        <Button className="logButton" variant="contained" color="primary" edge="end" component={AuthButtonComponent} popup='https://solidcommunity.net/common/popup.html'>
        </Button>
        <LoggedIn>
            <ProfileImage fullName={fullName} imageSrc={imageSrc} webId={webId} />
        </LoggedIn>
    </div>;
};

export default LoginBarView;