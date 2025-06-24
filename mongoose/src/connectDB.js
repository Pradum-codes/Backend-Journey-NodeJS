const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI
const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

module.exports = connectDb;