const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rut: { type: String, required: true },
  numeroDocumento: { type: String, required: true },
  telefono: { type: String, required: true },
  Direccion: { type: String, required: true }
});


module.exports = mongoose.model('Usuario', usuarioSchema);
