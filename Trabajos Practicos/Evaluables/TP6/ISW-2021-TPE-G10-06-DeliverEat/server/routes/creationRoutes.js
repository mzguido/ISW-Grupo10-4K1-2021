const mongoose = require('mongoose');

const Comercio = mongoose.model('comercio');
const Producto = mongoose.model('producto');
const Carrito = mongoose.model('carrito');

module.exports = app => {
  app.post('/comercio/new', async (req, res) => {
    const {
      productos,
      horarioApertura,
      horarioCierre,
      diasAtencion,
      tiempoPromedioAtencion,
      ubicacion,
      nombre,
      adherido,
      tipo,
      categoriasProducto,
      seguimientoCadete,
      image
    } = req.body;

    const comercio = new Comercio({
      productos,
      horarioApertura,
      horarioCierre,
      diasAtencion,
      tiempoPromedioAtencion,
      ubicacion,
      nombre,
      adherido,
      tipo,
      categoriasProducto,
      seguimientoCadete,
      image
    });

    try {
      await comercio.save();
      console.log('Comercio created successfully')
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/carrito/new', async (req, res) => {
    const { productos, dimensionMochila } = req.body;

    const carrito = new Carrito({
      productos,
      dimensionMochila
    });

    try {
      await carrito.save();
      console.log('Carrito created successfully')
    } catch (err) {
      res.status(422).send(err);
    }

  });

  app.post('/comercio/addproduct/:id', async (req, res) => {
    const { nombre, dimension, categoria, image, precio } = req.body;

    const producto = new Producto({
      nombre,
      dimension,
      categoria,
      image,
      precio
    });

    const comercio = await Comercio
      .updateOne(
        {
          _id: req.params.id
        },
        {
          $push: { productos: [producto] }
        }
      ).exec();

    try {
      await comercio.save();
      await producto.save();
      console.log('Producto created and added to Comercio successfully');
    } catch (err) {
      res.status(422).send(err);
    }

  })
}