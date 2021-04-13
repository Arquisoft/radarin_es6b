import React, { useState, useCallback, useEffect } from 'react';
import { getUsers, getLocatesByWebId } from '../../api/api';
import GoogleMapHome from './GoogleMapHome';
//import {deleteLocate,updateLocate} from '../../api/api'

function MapList(props) {

    const [friends, setFriends] = useState([]);
    const [locates, setLocates] = useState([]);

    const addLocalLocate = function (latitud, longitud, texto, solidId) {
        setLocates(current => [...current, {
            latitud: latitud,
            longitud: longitud,
            texto: texto,
            solidId: solidId
        }]);
    }

    const updateLocalLocate = function (id) {
        console.log(id);
        var texto = prompt("Nuevo nombre de la localización:");
        if (texto === "") {
            alert("No se puede actualizar una localizacion sin un nombre")
            return;
        }
        else if (texto !== null) {

            const aux = locates;

            for (var i = 0; i < locates.length; i++) {
                var obj = locates[i];
                console.log(obj);
                if (obj._id === id) {
                    //updateLocate(obj._id,texto).catch(err=>console.log(err));
                    locates[i].texto = texto;
                    break;
                }
            }
            setLocates(aux);
        }
    }

    const deleteLocalLocate = function (id) {

        const aux = [];

        for (var i = 0; i < locates.length; i++) {
            var obj = locates[i];

            if (obj._id !== id) {
                //deleteLocate(obj._id).catch(err=>console.log(err));
                aux.push(obj);
            }
        }
        setLocates(aux);
    }


    var getFriends = useCallback(async function () {
        getUsers(props.webId).then(response => {
            const realFriends = response
                .filter(posibleFriend => props.solidFriends.includes(posibleFriend.solidId));
            setFriends(realFriends);
        }).catch(err => console.log(err));
    }, [setFriends, props.webId, props.solidFriends]);


    var getLocates = useCallback(async function () {

        getLocatesByWebId(props.webId).then(response => {
            setLocates(response);
        }).catch(err => console.log(err));
    }, [setLocates, props.webId]);


    useEffect(() => {
        getFriends();
        getLocates();
    }, [getFriends, getLocates]);




    return (
        <GoogleMapHome friends={friends} locates={locates} addLocalLocate={addLocalLocate} updateLocalLocate={updateLocalLocate} deleteLocalLocate={deleteLocalLocate}></GoogleMapHome>
    );
}

export default MapList;