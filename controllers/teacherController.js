
import db from '../models/db.js';

export const addTeacher = (req, res) => {
  const { name, subject, email } = req.body;

  const q = 'INSERT INTO teachers (name, subject, email) VALUES (?, ?, ?)';
  db.query(q, [name, subject, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Teacher added' });
  });
};

export const getAllTeachers = (_, res) => {
  db.query('SELECT * FROM teachers', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};