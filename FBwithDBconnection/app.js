require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2/promise');

// Your Facebook User Access Token
const userAccessToken = process.env.FACEBOOK_USER_ACCESS_TOKEN;

// Function to get user profile data
async function getUserProfile() {
  try {
    const response = await axios.get('https://graph.facebook.com/v12.0/me', {
      params: {
        access_token: userAccessToken,
        fields: 'name,email'  // specify the fields you want to retrieve
      }
    });

    const userProfile = response.data;
    console.log('User Profile:', userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to connect to the database and insert user profile data
async function saveUserProfileToDatabase(userProfile) {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const insertQuery = `
      INSERT INTO employee (Name, Email_id)
      VALUES (?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [userProfile.name, userProfile.email]);
    console.log('User profile saved to database:', result);
  } catch (error) {
    console.error('Error saving user profile to database:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Main function to get user profile and save it to the database
async function main() {
  try {
    const userProfile = await getUserProfile();
    await saveUserProfileToDatabase(userProfile);
  } catch (error) {
    console.error('Error in main function:', error.message);
  }
}

// Call the main function
main();
