import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://kmadhav907:Benaka@20@scheduler.kacql.mongodb.net/prod?retryWrites=true&w=majority',
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
