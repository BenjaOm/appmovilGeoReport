const mongoose = require('mongoose');

const DenunciaSchema = new mongoose.Schema({
  descripcion: String,
  tipoDelito: {
    nombre: String,
    descripcion: String,
  },
  ubicacion: {
    latitud: Number,
    longitud: Number,
  },
  informacionAdicional: String,
  fotoUrl: String,
  documentoUrl: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
  usuario: {
    _id: mongoose.Schema.Types.ObjectId,
    tiposUsuario: [String],
    nombre: String,
    apellido: String,
    Rut: String,
    NumeroDocumento: String,
    correo: String,
    contrasena: String,
    telefono: String,
    Direccion: {
      Region: String,
      Provincia: String,
      Comuna: String,
      CodPostal: String,
      Calle: String,
      Departamento: String,
      Torre: String,
    },
  },
  constatacionLesiones: {
    estado: String,
    descripcion: String,
  },
  estado: String,
});

module.exports = mongoose.model('Denuncias', DenunciaSchema, 'Denuncias');
