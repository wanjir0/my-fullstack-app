
import db from '../models/db.js';

export const addStudent = (req, res) => {
  const { name, age, grade, gender, dob, parentName, parentPhone, address } = req.body;
  const q = 'INSERT INTO students (name, age, grade, gender, dob, parent_name, parent_phone, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(q, [name, age, grade, gender, dob, parentName, parentPhone, address], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Student added' });
  });
};

export const getAllStudents = (_, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};