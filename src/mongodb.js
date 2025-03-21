const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://rajesh:rajeshdb@databaseraj1.badb4ic.mongodb.net/?retryWrites=true&w=majority&appName=databaseraj1';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
