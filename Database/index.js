
import dotenv from 'dotenv';
import mongoose from "mongoose";


dotenv.config({ path: './.env' }); // Make sure this path is correct

const connectDB = async (req,res) => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.mb_url}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database is connected to ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Database connection is not established", error);
    res.status(400).json({ error:"not connectDBError" });
    process.exit(1);
  }
};

export default connectDB;
