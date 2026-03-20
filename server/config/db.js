const mongoose = require('mongoose');

// Vercel Serverless behavior: Define a global cache to prevent 
// connecting to the DB on every single request.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log('⚡ Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, 
    };

    mongoose.set('strictQuery', true);

    // Checks for either variable name to prevent deployment crashes
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!uri) {
      throw new Error('❌ Please define the MONGODB_URI or MONGO_URI environment variable inside Vercel.');
    }

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('✅ New MongoDB Connection Established');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', e);
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;