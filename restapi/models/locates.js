const mongoose = require("mongoose")


const schema = mongoose.Schema({
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    texto:{
        type: String,
        required: true
    },
    solidId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Locate", schema)