const fs = require("fs");
const model = require("../models/index");
const multer = require("multer");
const path = require("path");
const diskStorage = multer.diskStorage({
  // konfigurasi folder penyimpanan file
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
module.exports = (app) => {
  app.get("/get_images", (request, response) => {
    let db = [
      {
        id: 1,
        name: "Warior",
        attack: 100,
        defence: 50,
        agility: 30,
        magic: 0,
      },
      {
        id: 2,
        name: "Mage",
        attack: 10,
        defence: 20,
        agility: 50,
        magic: 100,
      },
    ];
    return response.json(db);
  });
  app.post("/upload_images", (request, response) => {
    const images = request;
    console.log(images);

    let db = [
      {
        id: 1,
        name: "Warior",
        attack: 100,
        defence: 50,
        agility: 30,
        magic: 0,
      },
      {
        id: 2,
        name: "Mage",
        attack: 10,
        defence: 20,
        agility: 50,
        magic: 100,
      },
    ];
    /* const base64 = images.toString().replace(/^data:image\/png;base64,/, "");
    const location = path.join(__dirname, "../public/images/out.png");
    // change image base64 to buffer
    const arrarbuffer = new Buffer.from(base64, "base64");
    fs.writeFile(location, arrarbuffer, (err) => {
      console.log(err);
    });*/

    return response.json(db);
  });
  app.post("/test", async (req, res, next) => {
    try {
      const { name, email, gender, phoneNumber } = req.body;
      const users = await model.users.create({
        name,
        email,
        gender,
        phone_number: phoneNumber,
      });
      if (users) {
        res.status(201).json({
          status: "OK",
          messages: "User berhasil ditambahkan",
          data: users,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: "ERROR",
        messages: err.message,
        data: {},
      });
    }
  });
};
