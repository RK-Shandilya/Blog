const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const commentModel = require("../models/commentModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.blogEntry = async (req, res) => {
    try {
        const { title, description, blogBody, tag ,userID} = req.body;
        console.log(req.body,req.files.blogImg,userID);    
        const imgBlog = req.files.blogImg;

        if (!title || !description || !blogBody || !tag || !imgBlog) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }
        const blogTitle = await blogModel.findOne({ title });
        if (blogTitle) {
            return res.status(400).json({
                success: false,
                message: "Title should be Unique"
            });
        }

        const blogURL = await uploadImageToCloudinary(imgBlog, process.env.FOLDER_NAME);
        console.log("blogURL ---> ",blogURL)
        const newBlog = await blogModel.create({
            title,
            description,
            blogBody,
            tag,
            userID,
            blogImg: blogURL.secure_url,
        });

        res.status(200).json({
            success: true,
            newBlog:newBlog,
            message: "Blog created Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Please Try again"
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await blogModel.find({}).exec();
        res.status(200).json({
            success: true,
            allBlogs:allBlogs
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Error while fetching post",
        });
    }
}

exports.getBlogById = async (req, res) => {
    try {
        console.log(req.params);
        const blogID = req.params.id;

        const blog = await blogModel.findById(blogID)?.populate("comments").populate("likes").exec();
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" })
        }
        res.status(200).json({
            success: true,
            blog,
            message:"Blog by Id fetched Successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Error while fetching blog by Id",
        });
    }
}

exports.deleteBlogById = async (req, res) => {
    try {
        const { blogID,userID } = req.body;
        console.log(blogID,userID)
        const deletedBlog = await blogModel.findByIdAndDelete({ _id:blogID });
        console.log("deletedBlog",deletedBlog)
        const updatedPost = await userModel.findByIdAndUpdate(userID, { $pull: { blogID: deletedBlog._id } }, { new: true }).exec();
        res.status(200).json({
            success: true,
            message: "Blog deleted Successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error occurred while deleting blog"
        })
    }
}

exports.updateBlogById = async (req, res) => {
    console.log("req",req.body);

    try {
        const {id} = req.header;
        const { title, description ,blogBody,tag,userID } = req.body;
        const imgBlog = req.files.blogImg
        if (!title || !description || !imgBlog) {
            res.status(403).json({
                sucess: false,
                message: "All fields are required"
            })
        }
        const blogURL = await uploadImageToCloudinary(imgBlog, process.env.FOLDER_NAME);
        const updatedBlog = await blogModel.findByIdAndUpdate(id, {
            title,
            description,
            blogBody,
            blogImg:blogURL.secure_url,
            tag,
            updatedAt: Date.now(),
            userID
        })
        res.status(200).json({
            success: true,
            message: "Blog updated Successfully",
            updatedBlog
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error while updating blog"
        })
    }
}

exports.TrendingBlogs = async(req,res) => {
    try{
        const trendBlogs = await blogModel.find({}).sort({likes:-1});
        
        res.status(200).json({
            status:true,
            trendBlogs,
            message:"Trending blog Fetched Successfully"
        })
    } catch(error){
        res.status(500).json({
            status:false,
            message:"Internal Server Error"
        })
    }
}