const mongoose = require('mongoose');

const Comercio = mongoose.model('comercio')

module.exports = app => {
  app.get('/comercios', async (req, res) => {
    const comercios = await Comercio.find();

    res.send(comercios);
  })

}