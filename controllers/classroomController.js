
import db from '../models/db.js';

export const addClassroom = (req, res) => {
  const { className, numStudents, classTeacher } = req.body;

  const q = 'INSERT INTO classrooms (class_name, num_students, class_teacher) VALUES (?, ?, ?)';
  db.query(q, [className, numStudents, classTeacher], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Classroom added' });
  });
};

export const getAllClassrooms = (_, res) => {
  db.query('SELECT * FROM classrooms', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};