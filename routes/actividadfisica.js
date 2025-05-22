const express = require('express');
const router = express.Router();
const db = require ('../db')

router.post('/', (req, res) => {

    const { date, type , duration, caloriesburned, user_id } = req.body;

    const sql = `
      INSERT INTO activity (create_date, act_type, duration, caloriesbur, user_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [date, type, duration, caloriesburned, user_id], (err, result) => {
      if (err) {
        console.error('Error al insertar datos:', err);
        return res.status(500).send('Error al guardar la información.');
      }

      res.send('Actividad registrada correctamente.');
    });

});


module.exports = router;