import React,{useState,useEffect,useCallback} from 'react';
import LocatesMarksList from './LocatesMarksList';
import { getLocatesByWebId } from '../../../../api/api';

const LocatesMarksEvaluate=(props)=>{
    const [locates, setLocates] = useState([]);

    var getLocates = useCallback(async function () {

        getLocatesByWebId(props.webId).then(response => {
            setLocates(response);
        }).catch(err => console.log(err));
    }, [setLocates, props.webId]);


    useEffect(() => {
        getLocates();
    }, [getLocates]);

    return <LocatesMarksList locatesList={locates}  />;
 }

 export default LocatesMarksEvaluate;