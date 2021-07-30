const express = require('express');
const bodyparse = require('body-parser')
const compression = require('compression')
const app = express();
app.use(bodyparse.json())
app.use(compression())

require('./routes/index')(app)
app.listen(3000, () => console.log('listenig on http://localhost:3000/'));
