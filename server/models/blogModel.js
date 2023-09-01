const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetail",
    }
    ,
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    blogBody:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        required:true,
    },
    blogImg:{
        type:String,
        required:true,
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment",
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"like",
    }]
},{timestamps:true})
module.exports = mongoose.model("blogdata",blogSchema);