const mongoose = require('mongoose');
const { dbname } = require('../constants');

async function connectDb() {
    try{
        const connectionInst = await mongoose.connect(`${process.env.MONGO_URI}/${dbname}`);
        console.log('Connected to MongoDB');
        console.log('Database Name:', connectionInst.connection.name);
        console.log('Database Name:', connectionInst.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDb;