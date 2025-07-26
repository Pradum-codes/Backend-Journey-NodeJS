const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;

const connectDb = async () => {
    try {
        const instance = await mongoose.connect(`${MONGO_URI}/${MONGO_DB}`);
        console.log("Connection Name:", instance.connection.name);
        console.log("DB Connected Succesfully");
    
    } catch(err){
        console.log("DB Connection error",err);
        throw err;
    }
}

module.exports = connectDb;