const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usuarioRutas = require('./api/rutas/rutasUsuario'); // Asegúrate de que la ruta es correcta
const router = express.Router();
const Usuario = require('./api/modelos/usuario'); // Asegúrate de que la ruta sea correcta
const Denuncia = require('./api/modelos/denuncias'); // Asume que tienes un modelo de Mongoose para Denuncias
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

const storage = multer.memoryStorage(); // Configura Multer para guardar en memoria
const upload = multer({ storage: multer.memoryStorage() });

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));


  app.use('/api', usuarioRutas); // Usa las rutas de registro de usuarios


  app.post('/api/login', async (req, res) => {
    try {
      const { correo, contrasena } = req.body;
      // Busca un usuario por correo
      const user = await Usuario.findOne({ correo: correo });
  
      if (user && user.contrasena === contrasena) {
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
  });



  app.post('/api/denuncias', upload.single('foto'), async (req, res) => {
    try {
      const {
        descripcion,
        tipoDelito,
        informacionAdicional,
        usuario,
        ubicacion,
        constatacionLesiones,
        estado,
      } = req.body;
      const foto = req.file ? req.file.path : null;
  
      const nuevaDenuncia = new Denuncia({
        descripcion,
        tipoDelito,
        ubicacion,
        informacionAdicional,
        fotoUrl: foto,
        usuario,
        constatacionLesiones,
        estado,
      });
  
      await nuevaDenuncia.save();
      res.status(200).send({ message: 'Denuncia registrada con éxito' });
    } catch (error) {
      res.status(500).send({ message: 'Error al registrar la denuncia', error: error.message });
    }
  });
  
  
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
