const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogdata"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Viewer"],
        required:true,
        default:"Viewer"
    }
})
module.exports = mongoose.model("userdetail",userSchema);