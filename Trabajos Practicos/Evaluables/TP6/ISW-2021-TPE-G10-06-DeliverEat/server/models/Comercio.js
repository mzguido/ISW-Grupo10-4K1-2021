const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductoSchema = require('./Producto');

const comercioSchema = new Schema({
  productos: { type: [ProductoSchema], default: [] },
  horarioApertura: String,
  horarioCierre: String,
  diasAtencion: [String],
  tiempoPromedioAtencion: Number,
  ubicacion: Object,
  nombre: String,
  adherido: { type: Boolean, default: true },
  tipo: String,
  categoriasProducto: [String],
  seguimientoCadete: { type: Boolean, default: false },
  image: String
})

mongoose.model('comercio', comercioSchema);