const mongoose = require('mongoose');

const direccionSchema = new mongoose.Schema({
  Region: String,
  Provincia: String,
  Comuna: String,
  CodPostal: String,
  Calle: String,
  Departamento: String,
  Torre: String,
});

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  edad: String,
  apellido: String,
  Rut: String,
  NumeroDocumento: String,
  correo: String,
  contrasena: String,
  telefono: String,
  Direccion: direccionSchema,
});

module.exports = mongoose.model('Usuarios', usuarioSchema, 'Usuarios');
