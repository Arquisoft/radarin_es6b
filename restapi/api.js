const express = require("express")
const User = require("./models/users")
const Locate = require("./models/locates")
const router = express.Router()
/*
// Get all users
router.get("/users/list", async (req, res) => {
    const users = await User.find({}).sort('-_id') //Inverse order
    res.send(users)
})

//register a new user
router.post("/users/add", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    //Check if the device is already in the db
    let user = await User.findOne({ email: email })
    if (user)
        res.send({error:"Error: This user is already registered"})
    else{
        user = new User({
            name: name,
            email: email,
        })
        await user.save()
        res.send(user)
    }
})

*/

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
    res.send(user);

});

router.post("/user/getById", async (req, res) => {
    const id = req.body.solidId;
    let user = await User.findOne({ solidId:id });
    res.send(user);
});

router.post("/user/getUsers", async (req, res) => {
    const id = req.body.solidId;
    const myFriends= await User.find({solidId:{$ne:id}});
    res.send(myFriends);
});

router.post("/user/getLocates", async (req, res) => {
    const id = req.body.solidId;
    const myLocates= await Locate.find({solidId:id});
    res.send(myLocates);
});

router.post("/user/locate/save", async (req, res) => {
    const solidId = req.body.solidId;
    const lat = req.body.latitud;
    const lon = req.body.longitud;
    const text=req.body.texto;

    let locate = await Locate.findOne({ latitud:lat, longitud:lon });

    if (locate == null) {
        locate = new Locate({
            latitud: lat,
            longitud: lon,
            solidId: solidId,
            texto: text
        });
    }

    await locate.save();
    res.send(locate);
});


module.exports = router