const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.execute(query, [email], (err, results) => {
    if (err) return res.status(500).send('Error en el servidor');

    if (results.length === 0) {
      return res.status(404).send('Correo no registrado');
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error al verificar contraseña');
      if (isMatch) {
        res.send('Inicio de sesión exitoso');
      } else {
        res.status(401).send('Contraseña incorrecta');
      }
    });
  });
});

module.exports = router;
