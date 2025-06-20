
import db from '../models/db.js';

export const addMark = (req, res) => {
  const { student, subject, score } = req.body;

  const q = 'INSERT INTO marks (student_name, subject, score) VALUES (?, ?, ?)';
  db.query(q, [student, subject, score], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Mark added' });
  });
};

export const getAllMarks = (_, res) => {
  db.query('SELECT * FROM marks', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};