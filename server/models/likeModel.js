const mongoose = require("mongoose")
const userModel = require("./userModel")
const blogModel = require("./blogModel");

const likeSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetail"
    },
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogdata"
    },
})

module.exports = mongoose.model("like",likeSchema);