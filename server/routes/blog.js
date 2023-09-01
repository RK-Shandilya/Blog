const express = require("express")
const router = express.Router();

const {verifyAuth , isAdmin , isViewer} = require("../middlewares/verifyAuth")

const {blogEntry,getAllBlogs,deleteBlogById, getBlogById, updateBlogById, TrendingBlogs} = require('../controllers/BlogController');
const { likeBlog, unlikeBlog , LikedOrNot } = require("../controllers/likeController");
const {createComment,deleteComment,fetchAllComments} = require("../controllers/commentController")

router.post("/createblog", verifyAuth ,blogEntry)
router.get("/getallblogs", verifyAuth , getAllBlogs)
router.get("/getblogbyid/:id", verifyAuth , getBlogById)
router.get("/mostlikedblogs", verifyAuth , TrendingBlogs)
router.delete("/deleteBlogById", verifyAuth ,deleteBlogById)
router.put("/updateblogbyid", verifyAuth ,updateBlogById)
router.post("/likedblogs",verifyAuth,likeBlog)
router.post("/unlikeblog",verifyAuth,unlikeBlog)
router.post('/likedornot',verifyAuth,LikedOrNot); 
router.post("/createcomment",verifyAuth,createComment)
router.get("/fetchallcomments",verifyAuth,fetchAllComments);
router.delete("/deletecomment" , verifyAuth , deleteComment)

module.exports = router;