const express = require('express');
const router = express.Router();
const db = require ('../db')

router.post('/', (req, res) => {
    const { weight, height, age, daily_goal, user_id } = req.body;
  
    const sql = `
      INSERT INTO fisic_record (weight, height, age, daily_goal, created_date, updated_date, user_id)
      VALUES (?, ?, ?, ?, CURDATE(), CURDATE(), ?)
    `;
  
    db.query(sql, [weight, height, age, daily_goal, user_id], (err, result) => {
      if (err) {
        console.error('Error al insertar datos:', err);
        return res.status(500).send('Error al guardar la información.');
      }
  
      res.send('Información personal registrada correctamente.');
    });
  });
  
  module.exports = router;