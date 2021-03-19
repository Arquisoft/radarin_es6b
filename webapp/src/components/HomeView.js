import NavComponent from './NavComponent';
import React from 'react';
import Map from './Map';

function HomeView(){
        return (
            <React.Fragment>
                <NavComponent />
                <Map/>
            </React.Fragment>
        );
}

export default HomeView;
