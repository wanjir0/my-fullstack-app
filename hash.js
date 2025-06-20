
import db from './models/db.js';
import bcrypt from 'bcrypt';

const insertAdminUser = async () => {
  const email = 'admin@school.com';
  const plainPassword = 'admin103';

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Insert the user into the database
    const q = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(q, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('❌ Error inserting user:', err.message);
      } else {
        console.log('✅ Admin user with hashed password inserted successfully');
      }

      // Close the connection and exit
      db.end();
    });
  } catch (err) {
    console.error('❌ Hashing failed:', err.message);
    db.end();
  }
};

insertAdminUser();