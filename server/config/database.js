const mongoose = require('mongoose');
require("dotenv").config();

const mongoURL = process.env.MONGODBURL
const dbconnect = () =>
    mongoose.connect((mongoURL), {
        useNewUrlparser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database Connected successfully");
    }).catch((err) => {
        console.log(`DB Connection Failed`);
        console.log("error : ", err);
        process.exit(1);
    })

module.exports = dbconnect;