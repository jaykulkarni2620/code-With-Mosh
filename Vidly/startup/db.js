const mongoose = require('mongoose');
const config = require('config');

module.exports = async function () {
  const db = config.get('db');

  try {
    await mongoose.connect(db);
    console.log(`Connected to ${db}...`);
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error; // Rethrow the error to indicate that the connection failed
  }
};
