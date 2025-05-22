const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calory_tracker'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la BD:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

module.exports = db;
