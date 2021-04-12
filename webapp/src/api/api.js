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