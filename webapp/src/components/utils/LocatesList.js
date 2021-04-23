import React, { useState, useCallback, useEffect } from 'react';
import { getLocatesByWebId } from '../../api/api';
import {useWebId} from "@solid/react";
import Locate from './Locate';
function LocatesList(props) {

    const [locates, setLocates] = useState([]);
    const webId= useWebId();

    var getLocates = useCallback(async function () {

        getLocatesByWebId(webId).then(response => {
            setLocates(response);
        }).catch(err => console.log(err));
    }, [setLocates, webId]);


    useEffect(() => {
        getLocates();
    }, [getLocates]);




    return (
        <div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
            {
                locates.map((locate, i) => {
                    return <Locate key={`locate_${i}`} locate={locate} accionSelectLocate={props.accionSelectLocate} />;
                })
            }
        </div>);

}

export default LocatesList;