const express = require('express');
const bodyparse = require('body-parser')
const compression = require('compression')
const app = express();
app.use(bodyparse.json())
app.use(compression())
require('dotenv').config()

require('./routes/index')(app)
app.listen(process.env.PORT, () => console.log(`listenig on  http://localhost:${process.env.PORT}/`));
