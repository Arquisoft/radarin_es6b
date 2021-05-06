import React, { useState, useCallback, useEffect } from 'react';
import GoogleMapHome from './GoogleMapHome';
import { deleteLocate, updateLocate, saveLocate } from '../../../api/api'

function MapList({ webId, users, locates, solidFriends, radio }) {

    const [friends, setFriends] = useState([]);


    const addLocalLocate = async function (latitud, longitud, texto, solidId) {
        await saveLocate(solidId, latitud, longitud, texto);
    }

    const updateLocalLocate = async function (id, textoAnterior) {
        var texto = prompt("Nuevo nombre de la localización:", textoAnterior);
        if (texto === "") {
            alert("No se puede actualizar una localizacion sin un nombre")
            return;
        }
        else if (texto !== null) {
            await updateLocate(id, texto);
        }
    }

    const deleteLocalLocate = async function (id, solidId) {
        await deleteLocate(id, solidId);
    }

    var getFriends = useCallback(function () {
        if (users) {
            const realFriends = users
                .filter(posibleFriend => solidFriends.includes(posibleFriend.solidId));
            setFriends(realFriends);
        }
    }, [setFriends, users, solidFriends]);


    useEffect(() => {
        getFriends();
    }, [getFriends]);


    return (
        <GoogleMapHome friends={friends} locates={locates} addLocalLocate={addLocalLocate} updateLocalLocate={updateLocalLocate} deleteLocalLocate={deleteLocalLocate} radio={radio}></GoogleMapHome>
    );
}

export default MapList;