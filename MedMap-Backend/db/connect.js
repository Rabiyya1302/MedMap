const mongoose=require("mongoose")
require("dotenv").config(
    
)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI , {
      serverSelectionTimeoutMS: 5000, // Optional: fail fast if can't connect
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports=connectDB;
