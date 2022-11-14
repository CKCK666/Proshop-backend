import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {});
    console.log("MongoDb connected...........".bgGreen);
  } catch (error) {
    console.error(`Error:${error.message}`.red);
    process.exit(1);
  }
};
export default connectDB;
