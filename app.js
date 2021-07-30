const express = require('express');
const bodyparse = require('body-parser')
const app = express();
app.use(bodyparse.json())
require('./routes/index')(app)
app.listen(3000, () => console.log('listenig on http://localhost:3000/'));
