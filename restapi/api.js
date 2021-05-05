const express = require("express")
const User = require("./models/users")
const Locate = require("./models/locates")
const router = express.Router()
const mongo = require('mongodb');

let clients = [];
let events = [];

function eventsHandler(request, response) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify(events)}\n\n`;

    response.write(data);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        response
    };

    clients.push(newClient);

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
}

router.get('/events', eventsHandler);

function sendEventsToAll(newEvent) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newEvent)}\n\n`))
}

async function ChangeUsers(request, respsonse) {
    const newEvent = { text: "change User list" };
    events.push(newEvent);
    respsonse.json(newEvent);
    return sendEventsToAll(newEvent);
}

async function ChangeLocates(request, respsonse, solidId) {
    const newEvent = { text: "change Locate list", webId: solidId };
    events.push(newEvent);
    respsonse.json(newEvent);
    return sendEventsToAll(newEvent);
}

router.post("/user/save", async (req, res) => {
    const solidId = req.body.solidId;
    const lat = req.body.latitud;
    const lon = req.body.longitud;

    let user = await User.findOne({ solidId });

    if (user == null) {
        user = new User({
            latitud: lat,
            longitud: lon,
            solidId: solidId
        });
    }

    await user.save();

    ChangeUsers(req, res);

});

router.post("/user/getById", async (req, res) => {
    const id = req.body.solidId;
    let user = await User.findOne({ solidId: id });
    res.send(user);
});

router.post("/user/getUsers", async (req, res) => {
    const id = req.body.solidId;
    const myFriends = await User.find({ solidId: { $ne: id }, rol: "Standard user" });
    res.send(myFriends);
});

router.post("/user/getLocates", async (req, res) => {
    const myLocates = await Locate.find();
    res.send(myLocates);
});

router.post("/user/locate/save", async (req, res) => {
    const solidId = req.body.solidId;
    const lat = req.body.latitud;
    const lon = req.body.longitud;
    const text = req.body.texto;

    let locate = await Locate.findOne({ latitud: lat, longitud: lon });

    if (locate == null) {
        locate = new Locate({
            latitud: lat,
            longitud: lon,
            solidId: solidId,
            texto: text,
        });
    }

    await locate.save();
    ChangeLocates(req, res, solidId);
});

router.post("/user/locate/delete", async (req, res) => {
    const id = mongo.ObjectID(req.body.id);
    const locate = await Locate.findById(id);
    const solidId = req.body.solidId;

    if (locate != null) {
        await locate.deleteOne();
        ChangeLocates(req, res, solidId);
    }
    else {
        res.send(id);
    }
});

router.post("/user/locate/update", async (req, res) => {
    const id = mongo.ObjectID(req.body.id);
    const text = req.body.texto;

    const locate = await Locate.findById(id);

    if (locate != null) {
        locate.texto = text;
        await locate.save();
        ChangeLocates(req, res, locate.solidId);
    }
    else {
        res.send(locate);
    }
});

router.post("/user/delete", async (req, res) => {
    const solidAdmin = req.body.id;
    const solidUserDelete = req.body.userId;

    const userAmin = await User.findOne({ solidId: solidAdmin });
    const findDelete = await User.find({ solidId: solidUserDelete });

    if (userAmin != null) {
        if (userAmin.rol == "Admin user") {
            const userDelete = findDelete[0];
            if (userDelete != null) {

                const locatesUser = await Locate.find({ solidId: solidUserDelete })
                locatesUser.map((locate) => {
                    locate.deleteOne();
                });

                await userDelete.deleteOne();

                ChangeUsers(req, res);
            }
            else {
                res.send(solidUserDelete);
            }
        }
    }
    else {
        res.send(solidAdmin);
    }
});

router.post("/user/getStandardUsers", async (req, res) => {
    const clients = await User.find();
    res.send(clients);
});

router.post("/user/changeRol", async (req, res) => {
    const id = req.body.solidId;
    const rolUser = req.body.rol;

    let user = await User.findOne({ solidId: id });
    if (user) {
        user.rol=rolUser;
        await user.save();

        ChangeUsers(req, res);
    }
    else {
        res.send(rol);
    }
});




module.exports = router