const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    console.log("Connecting to Mongo:", process.env.MONGO_URI); // debug
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;
