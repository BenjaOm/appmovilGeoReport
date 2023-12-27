const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/usuario'); // Asegúrate de que la ruta sea correcta

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
