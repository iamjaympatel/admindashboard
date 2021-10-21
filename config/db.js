const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex:true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Connection success')
  } catch (error) {
    throw Error(error);
    // process.exit(1);
  }
};

module.exports = connectDB;
