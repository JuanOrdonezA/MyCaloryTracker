const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Asegúrate de exportar tu conexión desde otro archivo

router.get('/', (req, res) => {
    const userId = req.session.userId; 
    const query = `
        SELECT fr.id, a.description AS aliment_description, fr.quantity, 
        ROUND(fr.quantity * a.calory_gr, 2) AS calory_total
        FROM food_record fr
        JOIN Aliment a ON fr.aliment_id = a.id
        WHERE fr.user_id = ?
        AND DATE(fr.created_date) = CURDATE()
`;
    db.execute(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al consultar registros' });
      res.json(results);
    });
  });


module.exports = router;