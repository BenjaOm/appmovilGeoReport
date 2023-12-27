const express = require('express');
const router = express.Router(); // Definir 'router' utilizando express.Router()
const Usuario = require('../modelos/usuario');

// Luego procedes a usar 'router' para definir tus rutas
router.post('/', async (req, res) => {
  try {
    const { correo, contrasena, ...restoDeDatos } = req.body;

    // Verificar si ya existe un usuario con ese correo
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(409).send({ message: 'El correo electrónico ya está en uso.' });
    }

    // Crear el nuevo usuario con la contraseña y el resto de datos
    let usuario = new Usuario({ correo, contrasena, ...restoDeDatos });

    // Guardar el usuario en la base de datos
    const usuarioRegistrado = await usuario.save();
    res.status(201).send(usuarioRegistrado);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al registrar el usuario.' });
  }
});

module.exports = router;
