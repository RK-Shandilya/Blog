const blogModel = require('../models/blogModel');
const commentModel = require('../models/commentModel')

exports.createComment = async (req, res) => {
    try {
        const { comment, userID, blogID } = req.body;
        const UserComment = await commentModel.create({
            userID,
            blogID,
            updatedAt:Date.now(),
            comments:comment
        })
        console.log("userComment",UserComment);
        const updatedPost = await blogModel.findByIdAndUpdate(blogID,
            { $push: { comments: UserComment._id } }, { new: true }).populate("comments").exec()

        res.status(200).json({
            success:true,
            post: updatedPost,
            message:"Comment Added Successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Creating comment",
        });
    }
}

exports.deleteComment = async(req,res) => {
    try{
        const {id,blogID} = req.body;
        const deletedComment = await commentModel.findByIdAndDelete(id);
        const updatedPost = await blogModel.findByIdAndUpdate(blogID,{$pull:{comments:deletedComment._id}},{new:true}).populate("comments").exec();
        res.status(200).json({
            success:true,
            message:"comment deleted successfully",
            post:updatedPost
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while deleting comment",
        })
    }
}

exports.fetchAllComments = async(req,res) => {
    try{
        const blogID = req.headers.blogid;
        console.log(blogID)
        const data = await commentModel.find({blogID:blogID});
        console.log("data",data);
        res.status(200).send({
            success:true,
            data:data.reverse(),
            message:"Comments fetched successfully"
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching comment",
        })
    }
}