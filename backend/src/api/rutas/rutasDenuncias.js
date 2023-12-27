const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Denuncia = require('../modelos/denuncias');

router.post('/', async (req, res) => {
  try {
    // Extraer el token de autenticación de los headers
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { direccion, descripcion, tipoDelitoSeleccionado, infoAdicional, ubicacionActual } = req.body;

    const nuevaDenuncia = new Denuncia({
      nombre: decodedToken.nombre,
      direccion,
      descripcion,
      tipoDelitoSeleccionado,
      infoAdicional,
      ubicacionActual,
    });

    await nuevaDenuncia.save();
    res.status(201).send(nuevaDenuncia);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
