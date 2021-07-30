const fs = require("fs");
const path = require("path");
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
    // console.log(request.body)
    const images = request.body.img;
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
    const base64 = images.toString().replace(/^data:image\/png;base64,/, "");
    fs.writeFile(
      path.join(__dirname, "../public/images/out.png"),
      base64,
      (err) => {
        console.log(err);
      }
    );
    return response.json(db);
  });
};