const express = require('express');
const router = express.Router();
const db = require ('../database/db')



router.post('/',(req, res) => {

    const { date, type , duration, caloriesburned} = req.body;

    const sql = `
      INSERT INTO activity (create_date, act_type, duration, caloriesbur, user_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [date, type, duration, caloriesburned, req.session.userId], (err, result) => {
      if (err) {
        console.error('Error al insertar datos:', err);
        return res.status(500).send('Error al guardar la información.');
      }

      res.send('Actividad registrada correctamente.');
    });

});

router.get('/',(req, res) => {
  const query = `
    SELECT 
      create_date,
      act_type,
      duration,
      caloriesbur
    FROM activity
    WHERE user_id = ?
    ORDER BY create_date DESC
  `;

  db.execute(query, [req.session.userId], (err, results) => {
    if (err) {
      console.error('Error al obtener actividades:', err);
      return res.status(500).send('Error en el servidor');
    }

    res.json(results); // Devuelve la lista como JSON para mostrarla en una tabla
  });
});


module.exports = router;