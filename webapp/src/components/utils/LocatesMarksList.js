import React from 'react';
import LocateMark from './LocateMark';

function LocatesMarksList({ locatesList }) {
    return (
        locatesList.map((locate, i) => {
            return <LocateMark key={`locateMark_${i}`} locate={locate} />;
        })
    );

}

export default LocatesMarksList;