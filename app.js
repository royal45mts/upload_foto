const express = require("express");
const bodyparse = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const app = express();
app.use(bodyparse.json());
app.use(compression());
require("dotenv").config();
app.use(cors());
app.use("/public/img/", express.static(__dirname + "/public/images"));

require("./routes/index")(app);

app.listen(process.env.PORT, () =>
  console.log(`listenig on  http://localhost:${process.env.PORT}/`)
);
