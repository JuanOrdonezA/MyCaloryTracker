const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

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
app.use('/actividadfisica', actividadFisicaRoute);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});


