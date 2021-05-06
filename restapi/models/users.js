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
    solidId: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: "Standard user"
    },
    covid: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date }
    , updated_at: { type: Date }
});

schema.pre('save', function(next){
    var now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
  });

module.exports = mongoose.model("User", schema)