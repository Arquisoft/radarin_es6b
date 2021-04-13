export async function saveUser(webId,latitude,longitude) {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    const information = {
        "solidId": webId,
        "latitud": latitude,
        "longitud": longitude
    };
    let response = await fetch(apiEndPoint + '/user/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(information)
    })
    return await response.json();
}

export async function getUserByWebId(webId) {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    const information = {
        "solidId": webId,
    };
    let response = await fetch(apiEndPoint + '/user/getById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(information)
    });
    return await response.json();
}

export async function getUsers(webId) {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    const information = {
        "solidId": webId,
    };
    let response = await fetch(apiEndPoint + '/user/getUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(information)
    });
    return await response.json();
}

export async function getLocatesByWebId(id) {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    const information = {
        "solidId": id,
    };
    let response = await fetch(apiEndPoint + '/user/getLocates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(information)
    });
    return await response.json();
}

export async function saveLocate(webId,latitude,longitude,texto) {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    const information = {
        "solidId": webId,
        "latitud": latitude,
        "longitud": longitude,
        "texto": texto
    };
    let response = await fetch(apiEndPoint + '/user/locate/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(information)
    })
    return await response.json();
}

export async function deleteLocate(id) {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    const information = {
        "id":id
    };
    let response = await fetch(apiEndPoint + '/user/locate/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(information)
    })
    return await response.json();
}

export async function updateLocate(id,texto) {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    const information = {
        "id":id,
        "texto": texto
    };
    let response = await fetch(apiEndPoint + '/user/locate/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(information)
    })
    return await response.json();
}