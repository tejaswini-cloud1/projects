require('dotenv').config();
const axios = require('axios');
const sql = require('mssql');

// Your Facebook User Access Token
const userAccessToken = process.env.FACEBOOK_USER_ACCESS_TOKEN;

// SQL Server Connection Configuration
const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
  },
};

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

    // Insert user profile data into the SQL Server database
    await saveUserProfileToDatabase(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
  }
}

// Function to save user profile data to the SQL Server database
async function saveUserProfileToDatabase(userProfile) {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('name', sql.VarChar, userProfile.name)
      .input('email', sql.VarChar, userProfile.email)
      .query(`
        IF EXISTS (SELECT 1 FROM dbo.client WHERE email = @Email)
          UPDATE dbo.client SET name = @Name WHERE email = @Email
        ELSE
          INSERT INTO dbo.client (name, email) VALUES (@Name, @Email)
      `);
    console.log('User profile saved to database:', result);
  } catch (error) {
    console.error('Error saving user profile to database:', error);
  } finally {
    sql.close();
  }
}

// Call the function
getUserProfile();
