import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async (uri, dbName) => {
  if (isConnected) {
    return mongoose;
  }
  try {
    const db_connection = await mongoose.connect(uri, { dbName });
    isConnected = true;
    console.log("✅ MongoDB (Mongoose) connected!");
    return db_connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
