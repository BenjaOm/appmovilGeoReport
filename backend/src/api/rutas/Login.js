const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../modelos/usuario');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

router.post('/login', async (req, res) => {
  console.log("Datos recibidos:", req.body);

  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrecta' });
    }

    const esContrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esContrasenaValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrecta' });
    }

    // Crear un token que incluya el nombre de usuario
    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en la ruta de login:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

module.exports = router;
