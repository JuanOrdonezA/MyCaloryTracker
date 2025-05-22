const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Asegúrate de exportar tu conexión desde otro archivo

router.get('/', (req, res) => {
  const query = 'SELECT id, description FROM Aliment WHERE status = 1';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error al obtener alimentos');
    res.json(results);
  });
});

// Ruta para registrar un alimento
router.post('/', async (req, res) => {
  const { aliment_id, quantity} = req.body;

  console.log('Datos recibidos:', { aliment_id, quantity});

  try {
    const query = `
      INSERT INTO food_record (quantity, status, created_date, updated_date, aliment_id, user_id)
      VALUES (?, 1, CURDATE(), CURDATE(), ?, ?)
    `;
    await db.promise().execute(query, [quantity, aliment_id, req.session.userId]);

    res.send('Alimento registrado con éxito');
  } catch (error) {
    console.error('Error al registrar alimento:', error);
    res.status(500).send('Error en el servidor');
  }
});


module.exports = router;
