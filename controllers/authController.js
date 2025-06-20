
import db from '../models/db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;


  if (!email.includes('@') || password.length < 5) {
    return res.status(400).json({ message: 'Invalid email or weak password' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const q = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(q, [email, hashed], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // dummy code
  let user = {id:"",email:"",password:"",created_at:""};
  let pwd = "";
  let isMatch = false;
  console.log(email, password);
    db.query(`SELECT * FROM users WHERE email =?`, [email], (err, results)=>{
      if (err) {return console.log("not exist");}
      console.log(`results > ${results[0].email}`);
      pwd = results[0].email;
      Object.keys(results[0]).forEach(key => {
      // console.log(`${key} > ${results[0][key]}`);
      user = {...user, [key]:results[0][key]};
 
      });
      Object.keys(user).forEach(key => {
      console.log(`${key} > ${user[key]}`); 
      if (key==="password") {
        console.log("key",key);
        console.log(bcrypt.compare(password, user[key]));
        async function aa(){
          console.log(await bcrypt.compare(password, user[key]));
          isMatch = await bcrypt.compare(password, user[key]);
        }
        aa();
        console.log(`password >${password} user.password >${user[key]} isMatch > ${isMatch}`);

      } else console.log("!key",key);
      });



    });




  // dummy code

  try {
    const results =  db.query('SELECT * FROM users WHERE email =?', [email]);


    if (results.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    // const user = results[0];
    // const isMatch = await bcrypt.compare(password, pwd);

// console.log(`password >${password} user.password >${user.password} isMatch > ${isMatch}`);

    if (isMatch) {
      res.status(200).json({
        message: 'Login successful',
        user
      });
    } else{
      console.log(`isMatch> ${isMatch}`);
      return res.json({ message: 'Invalid credentials' }); //res.status(401).json({ message: 'Invalid credentials' });

    }

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};