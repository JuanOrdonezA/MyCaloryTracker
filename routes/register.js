const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/db');

router.post('/', (req, res) => {
  const { name, last_name, email, password } = req.body;

  if (!name || !last_name || !email || !password) {
    return res.status(400).send('Faltan campos requeridos');
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error al encriptar contraseña');

    const query = `
      INSERT INTO users (name, last_name, email, password, status, created_date, updated_date, profile_id)
      VALUES (?, ?, ?, ?, 1, CURDATE(), CURDATE(), 1)
    `;

    db.execute(query, [name, last_name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al registrar usuario');
      }
      res.send('Usuario registrado exitosamente');
    });
  });
});

module.exports = router;
