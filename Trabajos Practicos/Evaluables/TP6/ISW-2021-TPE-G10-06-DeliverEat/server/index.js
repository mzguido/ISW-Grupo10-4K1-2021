const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cors = require('cors');

require('./models/Producto');
require('./models/Carrito');
require('./models/Comercio');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(cors());
app.options('*', cors());

require('./routes/creationRoutes')(app);
require('./routes/comerceRoutes')(app);
require('./routes/cartRoutes')(app);

const PORT = 5000;

app.listen(PORT);