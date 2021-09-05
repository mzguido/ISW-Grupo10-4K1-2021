const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/Producto');
require('./models/Carrito');
require('./models/Comercio');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hola mundovich')
})

require('./routes/creationRoutes')(app);

const PORT = 5000;

app.listen(PORT);