import React, { useState, useCallback, useEffect } from 'react';
import { getUsers, getLocatesByWebId } from '../../api/api';
import GoogleMapHome from './GoogleMapHome';
import { deleteLocate, updateLocate, saveLocate } from '../../api/api'

function MapList(props) {

    const [friends, setFriends] = useState([]);
    const [locates, setLocates] = useState([]);

    const addLocalLocate = async function (latitud, longitud, texto, solidId) {
        await saveLocate(solidId, latitud, longitud, texto).then(locate => {
            setLocates(current => [...current, {
                _id: locate._id,
                latitud: locate.latitud,
                longitud: locate.longitud,
                texto: locate.texto,
                solidId: locate.solidId
            }]);
        }).catch(err => console.log(err));

    }

    const updateLocalLocate = async function (id,textoAnterior) {
        var texto = prompt("Nuevo nombre de la localización:",textoAnterior);
        if (texto === "") {
            alert("No se puede actualizar una localizacion sin un nombre")
            return;
        }
        else if (texto !== null) {
            await updateLocate(id, texto).then(response => {
            }).catch(err => console.log(err));
            setLocates(locates.map(l => l._id === id ? { ...l, texto } : l));
        }

    }

    const deleteLocalLocate = async function (id) {
        await deleteLocate(id).then(response => {
        }).catch(err => console.log(err));
        setLocates(locates.filter(l => l._id !== id));
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