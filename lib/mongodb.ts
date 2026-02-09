import mongoose from "mongoose";

/**
 * Global type declaration for caching the Mongoose connection
 * This prevents TypeScript errors when accessing global.mongoose
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

/**
 * MongoDB connection URI from environment variables
 * Throws an error if MONGODB_URI is not defined
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global cache to store the MongoDB connection
 * In development, Next.js hot reload can cause multiple connections
 * Using a global variable prevents creating new connections on every reload
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and returns a cached MongoDB connection using Mongoose
 * 
 * @returns {Promise<mongoose.Connection>} The active MongoDB connection
 * 
 * Connection Strategy:
 * - In development: Uses cached connection to survive hot reloads
 * - In production: Creates a new connection on cold starts
 * - Reuses existing connection if already established
 */
async function connectToDatabase(): Promise<mongoose.Connection> {
  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if one doesn't exist
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable buffering for better error handling
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log("MongoDB connected successfully");
      return mongooseInstance.connection;
    });
  }

  try {
    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise on error to allow retry on next call
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
