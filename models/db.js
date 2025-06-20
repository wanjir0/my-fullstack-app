
import mysql from 'mysql2';
// const mysql2 = require('mysql2');

import dotenv from 'dotenv';

dotenv.config();

const db = await mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME
  host: "localhost",
  user: "root",
  password: "macharia@001",
  database: "denat_school"

});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

db.query('SELECT * FROM users', (err, results) => {
    if (err) {console.log("err");}
    // console.log(results);
    // Object.keys(results[0]).forEach(key => {
    //   console.log(`key > ${key} obj> ${results[0][key]}`);
 
    //   });



  }
);

export default db;