const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductoSchema = require('./Producto');

const carritoSchema = new Schema({
  productos: [ProductoSchema],
  dimensionMochila: Number
})

mongoose.model('carrito', carritoSchema);