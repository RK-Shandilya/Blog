const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const user = require('./routes/user');
const blog = require('./routes/blog')
const dbconnect = require('./config/database')
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const multer = require('multer')
const {cloudinaryConnect} = require("./config/cloudinary")
dotenv.config();
dbconnect();


const PORT = process.env.PORT || 8000
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp/",
	})
)

app.use(cookieParser())
app.use(cors());
app.use('/api/v1',user);
app.use('/api/v1',blog);


cloudinaryConnect();

app.listen(PORT,()=>{
    console.log(`your server is running at Port No ${PORT}`)
})