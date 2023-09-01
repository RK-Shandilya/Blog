const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');
dotenv.config();

exports.verifyAuth = async (req, res, next) => {
    console.log("header",req.headers);
    console.log("body",req.body)
    try {
        const token =  req.header("Authorization")?.replace("Bearer ","") || req.body.token || req.cookies.token
        console.log("token",typeof(token));

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }
        try {
            console.log("ji-------")
            const decode = await jwt.verify(token, process.env.JWTSECRET);
            req.user = decode;
            console.log("hello-----------------")
            next();
        }
        catch (err) {
            console.log(err);
            res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong While Validating the Token"
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const userDetails = await userModel.findOne({ email: req.user.email });
        if (userDetails.role !== "Admin") {
            res.status(401).json({
                success: false,
                message: "This route is protected for Admin"
            })
        }
        next();
    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"User Role Can't be Verified"
        })
    }
}

exports.isViewer = async (req, res, next) => {
    try {
        const userDetails = await userModel.findOne({ email: req.user.email });
        if (userDetails.role !== "Viewer") {
            res.status(401).json({
                success: false,
                message: "This route is protected for Viewer"
            })
        }
        next();
    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"User Role Can't be Verified"
        })
    }
}