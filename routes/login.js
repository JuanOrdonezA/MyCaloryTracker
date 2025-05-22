const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/db');

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
        req.session.userId = user.id;
      
        // Esperar que la sesión se guarde antes de enviar la respuesta
        req.session.save(err => {
          if (err) {
            console.error('Error al guardar la sesión:', err);
            return res.status(500).send('No se pudo iniciar sesión');
          }
      
          res.send('Inicio de sesión exitoso');
        });
      }
    });
  });
});


module.exports = router;
