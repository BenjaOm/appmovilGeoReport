const express = require('express');
const router = express.Router();
const UsuarioRegistro = require('../modelos/usuario');

router.post('/Registrarusuarios', async (req, res) => {
    try {
    const { nombre, apellido, edad, Rut, NumeroDocumento, correo, contrasena, telefono, Direccion } = req.body;
    // Validaciones y encriptación de contraseña aquí
    const nuevoUsuario = new UsuarioRegistro({
      nombre,
      apellido,
      edad,
      Rut,
      NumeroDocumento,
      correo,
      contrasena,
      telefono,
      Direccion
    });
    await nuevoUsuario.save();
    res.status(200).send({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).send({ message: 'Error al registrar el usuario', error: error.message });
  }
});

module.exports = router;
