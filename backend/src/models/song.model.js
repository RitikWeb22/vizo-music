const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:[true,"url is required"]
    },
    posterUrl:{
        type:String,
        required:[true,"posterUrl is required"]
    },
    title:{
        type:String,
        required:[true,"title is required"]
    },
    mood:{
        type:String,
        enum:["happy","sad","surprised","neutral"]
    }
})

const songsModel = mongoose.model("songs",songSchema)

module.exports = songsModel