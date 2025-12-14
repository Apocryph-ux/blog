import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/authdb');
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

