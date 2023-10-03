/* eslint-disable no-console */
import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI as string;

async function connectDb(): Promise<void> {
  try {
    await mongoose.connect(dbUri);
    console.info('Database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

async function disconnectDb(): Promise<void> {
  try {
    await mongoose.connection.close();
    console.info('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
}

export { connectDb, disconnectDb };
