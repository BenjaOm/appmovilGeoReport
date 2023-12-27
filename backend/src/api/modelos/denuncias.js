const mongoose = require('mongoose');

const denunciaSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  descripcion: String,
  tipoDelitoSeleccionado: String,
  infoAdicional: String,
  ubicacionActual: {
    latitude: Number,
    longitude: Number
  },
  fecha: { type: Date, default: Date.now },
});

const Denuncia = mongoose.model('Denuncia', denunciaSchema);

module.exports = Denuncia;
