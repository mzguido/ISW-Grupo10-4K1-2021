const mongoose = require('mongoose');

const Carrito = mongoose.model('carrito');
const Comercio = mongoose.model('comercio');

module.exports = app => {
  app.post('/cart/add/:id', async (req, res) => {

    const comercio = await Comercio.findById(req.params.id).lean();

    const producto = comercio.productos.find(prod => prod._id.toString() === req.body._id)

    const carrito = await Carrito
      .updateOne(
        {
          $addToSet: { productos: producto }
        }
      ).exec()

    res.send(carrito);
  })

  app.post('/cart/remove/:id', async (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.id);

    const carrito = await Carrito
      .updateOne(
        {
          $pull: { productos: { _id: id } }
        }
      ).exec();

    res.send(carrito);
  })

  app.get('/cart', async (req, res) => {
    const carrito = await Carrito.find();

    res.send(carrito);
  })


}

