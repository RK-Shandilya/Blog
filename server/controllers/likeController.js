const blogModel = require('../models/blogModel');
const likeModel = require('../models/likeModel');

exports.likeBlog = async(req,res) =>{
    try{
        const {userID,blogID} = req.body;
        const userLike = await likeModel.create({
            userID,
            blogID,
        });
        const updatedPost = await blogModel.findByIdAndUpdate(blogID,{$push:{likes:userLike._id}},{new:true}).populate("likes").exec();
        res.status(200).json({
            success:true,
            post: updatedPost,
            message:"Post Liked Successfully"
        });
    }  catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error while liking comment",
        })
    }
    
}

exports.unlikeBlog = async(req,res) =>{
    try{
        const {blogID} = req.body;
        const deletedLike = await likeModel.findOneAndDelete({blogID});
        const updatedPost = await blogModel.findByIdAndUpdate(blogID,{$pull : {likes:deletedLike._id}},{new:true}).populate("likes").exec();
        res.status(200).json({
            success:true,
            updatedPost,
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:"Error while unliking Post"
        })
    }
}

exports.LikedOrNot = async(req,res) => {
    try{
        const {blogID,userID} = req.body;
        console.log("ID",userID,blogID)
        const data = await likeModel.find({blogID:blogID});
        if(!data){
            return res.status(200).send({
                success:false,
                message:"Not liked Yet"
            })
        }
        return res.status(200).send({
            success:true,
            data,
            message:"liked fetched successfully"
        })
    } catch(error){
        res.status(500).json({
            success:false,
            message:"Error while fetching like"
        })
    }
}