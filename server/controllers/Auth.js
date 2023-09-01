const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signUP = async (req, res) => {
    console.log(req.body);
    try {
        
        const { email, password, confirmPassword, name } = req.body;
        if (!email || !password || !confirmPassword || !name) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required",
            })
        }
       
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue."
            })
        }
        if (password !== confirmPassword) {
            console.log('password not match');
            return res.status(400).json({
                success: false,
                message: "Passwors doesn't match .Please Try Again"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        })
        user.password=undefined;
        if (user) {
            res.status(200).json({
                success: true,
                user,
                message: "SignUP Successfully"
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went Wrong"
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"SignUp Failed"
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required",
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User doesn't Exist.Please go to signUp page."
            })
        }
        const existingPassword = user.password;
        const matchPass = await bcrypt.compare(password, existingPassword)

        if (matchPass) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role
            }
            const secret = process.env.JWTSECRET;
            const token = jwt.sign(payload, secret, {
                expiresIn: "24h",
            })

            user.token = token;
            user.password = undefined;

            const options = {
                expiresIn: Date.now() + 3 * 24 * 60 * 60 * 1000,
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                token,
                message: "Login Successfully",

            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        })
    }
}