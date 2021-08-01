const fs = require("fs");
const model = require("../models/index");
const multer = require("multer");
const path = require("path");
const diskStorage = multer.diskStorage({
  // konfigurasi folder penyimpanan file
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
module.exports = (app) => {
  app.put("/upload_images_image", async (req, res) => {
    // const base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
    try {
      // const file = req.file.path;
      console.log(req.body);
      const imgbase64 = req.body.img.replace(/^data:image\/png:base64,/, "");
      const buffer = new Buffer.from(imgbase64, "base64");
      console.log(buffer);
      const location = path.join(__dirname, "../public/images/tes.png");
      fs.writeFile(location, buffer, (err) => {
        res.status(400).json({
          status: "ERROR",
          messages: err.message,
          data: {},
        });
      });
      // fs.writeSync()
      return;
      const users = await model.upload_images.create({
        foto:
          typeof req.file.filename === "string"
            ? `${process.env.SERVER}public/img/test.png`
            : null,
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
  app.put(
    "/get_images",
    multer({ storage: diskStorage }).single("img"),
    async (req, res) => {
      try {
        const file = req.file.path;
        const users = await model.upload_images.create({
          foto:
            typeof req.file.filename === "string"
              ? `${process.env.SERVER}public/img/${req.file.filename}`
              : null,
        });

        if (users) {
          res.status(201).json({
            status: "OK",
            messages: "User berhasil ditambahkan",
            data: users,
          });
        }
        if (!file) {
          res.status(400).send({
            status: false,
            data: "No File is selected.",
          });
        }
        res.send(file);
      } catch (err) {
        res.status(400).json({
          status: "ERROR",
          messages: err.message,
          data: {},
        });
      }
    }
  );
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
  /* app.put(
    "/contact/upload"
    /!* multer({ storage: diskStorage }).single("photo"),
    (req, res) => {
      const file = req.file.path;
      if (!file) {
        res.status(400).send({
          status: false,
          data: "No File is selected.",
        });
      }
      res.send(file);
    }*!/
  );*/
  app.get("/get_images", async function (req, res, next) {
    try {
      const users = await model.upload_images.findAll({});
      if (users.length !== 0) {
        res.json({
          status: "OK",
          messages: "",
          data: users,
        });
      } else {
        res.json({
          status: "ERROR",
          messages: "EMPTY",
          data: {},
        });
      }
    } catch (err) {
      res.json({
        status: "ERROR",
        messages: err.message,
        data: {},
      });
    }
  });
  app.get("/get_images/:id", async function (req, res, next) {
    try {
      const usersId = req.params.id;

      const users = await model.upload_images.findOne({
        where: {
          id: usersId,
        },
      });
      if (users.length !== 0) {
        res.json({
          status: "OK",
          messages: "",
          data: users,
        });
      } else {
        res.json({
          status: "ERROR",
          messages: "EMPTY",
          data: {},
        });
      }
    } catch (err) {
      res.json({
        status: "ERROR",
        messages: err.message,
        data: {},
      });
    }
  });
  app.patch("/:id", async function (req, res, next) {
    try {
      const usersId = req.params.id;
      const { name, email, gender, phoneNumber } = req.body;
      const users = await model.users.update(
        {
          name,
          email,
          gender,
          phone_number: phoneNumber,
        },
        {
          where: {
            id: usersId,
          },
        }
      );
      if (users) {
        res.json({
          status: "OK",
          messages: "User berhasil diupdate",
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
  app.delete("/get_images/:id", async function (req, res, next) {
    try {
      const usersId = req.params.id;
      const users_find = await model.upload_images.findOne({
        where: {
          id: usersId,
        },
      });
      if (users_find.length !== 0) {
        // deleted file
        const length_foto = users_find.foto.toString().split("/");
        await fs.unlinkSync(
          path.join(
            __dirname,
            `../public/images/${length_foto
              .splice(length_foto.length - 1, 1)
              .join("")}`
          )
        );
        // deleted mysql
        const users = await model.upload_images.destroy({
          where: {
            id: usersId,
          },
        });
        if (users) {
          res.json({
            status: "OK",
            messages: "User berhasil dihapus",
            data: users,
          });
        }
      } else {
        res.json({
          status: "ERROR",
          messages: "EMPTY",
          data: {},
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
