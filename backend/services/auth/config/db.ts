import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "multiagent",
    });
    console.log(`MongoDB is connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default connectDB;
