const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetail"
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogdata"
    },
    comments:{
        type:String,
        required:true
    }
},{timestamp:true})

module.exports = mongoose.model("comment",commentSchema);