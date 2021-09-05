const mongoose = require('mongoose');

const Carrito = mongoose.model('carrito');
const Producto = mongoose.model('producto')

module.exports = app => {
  app.post('/cart/add/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    const carrito = await Carrito
      .updateOne(
        {
          $push: { productos: [producto] }
        }
    ).exec()
    
    res.send(carrito);
  })

  app.get('/cart', async (req, res) => {
    const carrito = await Carrito.find();

    res.send(carrito);
  })
}

