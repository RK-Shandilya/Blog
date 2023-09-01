const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.deleteUser = async (req, res) => {
    try {
        const { userID } = req.body;
        if(!userID) {
            return res.status(400).json({
                success:false,
                message:"User Doesn't Exist"
            })
        }
        const userBlogs = await blogModel.findByIdAndDelete({ userID });
        const deletedUser = await userModel.findByIdAndDelete({ userID });
        res.status(200).json({
            success:true,
            message:"User Deleted successfully"
        })
    }   catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:"Error Occurred while Deleting User"
        })
    }
}

exports.makeAdmin = async(req,res) => {
    try{
        const {userID}  = req.body;
        const user = await userModel.findOne({userID});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user doesn't exist"
            })
        }
        if(user.role === "Admin"){
            return res.status(400).json({
                success:false,
                message:"user is already admin"
            })
        }
        const updatedUser = await userModel.findByIdAndUpdate(userID,{
            role:"Admin",
        })
    } catch(err){

    }
}