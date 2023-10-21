/* eslint-disable no-console */
const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI;

/**
 * Connects to the database.
 *
 * @returns {Promise<void>} - Resolves when the connection is established.
 */
async function connectDb() {
  try {
    await mongoose.connect(dbUri);
    console.info('Database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

/**
 * Disconnects from the database.
 *
 * @returns {Promise<void>} - Resolves when the connection is closed.
 */
async function disconnectDb() {
  try {
    await mongoose.connection.close();
    console.info('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
}

module.exports = { connectDb, disconnectDb };
