import React from 'react';
import Locate from './Locate';
import Typography from '@material-ui/core/Typography';

function LocatesList({ accionSelectLocate, locates }) {


    if (locates) {
        if (locates.length > 0) {
            return (<div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
                {
                    locates.map((locate, i) => {
                        return <Locate key={`locate_${i}`} locate={locate} accionSelectLocate={accionSelectLocate} />;
                    })
                }
            </div>);
        }
        else {
            return (
                <div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
                    <Typography component="p">
                        You don't have any location yet
            </Typography>
                </div>);

        }
    }
    else {
        return null;
    }

}

export default LocatesList;