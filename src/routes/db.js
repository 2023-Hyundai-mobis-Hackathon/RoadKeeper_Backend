const dotenv = require("dotenv");
const config = require('../config/config');
const mongoose = require('mongoose');

dotenv.config(); //LOAD CONFIG

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("[server] DB connection is sucessfull")
    } catch (e) {
        console.error(e);
    }
}

module.exports = connectDb