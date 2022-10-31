const path = require("path");
const fs = require("fs");
const app = require("express").Router;

module.exports = () => {
  app.get("/notes", function (res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  fs.readFile("./db/db.json", (userData) => {
    const notesdata = JSON.parse(userData);
    app.get("/api/notes", function (res) {
      res.json(notesdata);
    });

    function create(notes) {
      fs.writeFileSync("./db/db.json", JSON.stringify(notes, "\t"), () => {
        return true;
      });
    }

    app.post("/api/notes", function (req, res) {
      req.body.id = notesdata.length;
      const Note = req.body;
      notesdata.push(Note);
      res.json(Note);
      return create();
    });

    app.get("/api/notes/:id", function (req, res) {
      res.json(notesdata[req.params.id]);
    });
  });
};