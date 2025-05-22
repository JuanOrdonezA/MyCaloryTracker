const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(session({
  secret: 'admin', 
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.redirect('/login.html');
});



// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Rutas
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const registerAlimentoRoute = require('./routes/registro-alimento');
const verRegistroRoute = require('./routes/ver-registro');
const estadoFisicoRoute = require('./routes/estado-fisico');
const actividadFisicaRoute = require('./routes/actividadfisica');



app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/registro-alimento', registerAlimentoRoute);
app.use('/ver-registro', verRegistroRoute);
app.use('/estado-fisico', estadoFisicoRoute);
app.use('/actividadfisica',actividadFisicaRoute);



app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    res.redirect('/login.html');
  });
});
// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});


