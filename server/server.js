const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_NAME,
});

app.post('/saveUserProfile', async (req, res) => {
  const { name, email, picture } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO user_profiles (name, email, picture) VALUES (?, ?, ?)',
      [name, email, picture]
    );
    connection.release();
    res.status(200).send('User profile saved');
  } catch (error) {
    res.status(500).send('Error saving user profile');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:3000');
});