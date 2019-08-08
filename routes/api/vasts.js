const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const root = path.dirname(require.main.filename);

const is_exists = filename => {};
// @route   GET api/vasts/:name
// @desc    return a vast xml by its name
// @access  Public
router.get("/vast/:name", (req, res) => {
  const name = req.params.name;
  let path;
  //   const ip = req.query.ip;
  if (name) {
    path = root + "/vasts/" + name;
    fs.access(path, fs.F_OK, err => {
      if (err) {
        res.status(404).send("File not found!");
      } else {
        res.type("application/xml").sendFile(path);
      }
    });
  } else {
    res.status(400).send("No name provided");
  }
});

router.get("/vast/none", (req, res) => {
  res.type("application/xml").sendFile(root + "/vasts/noads.xml");
});

router.post("vast", (req, res) => {
  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  uploadFile.mv(`${root}/vasts/${fileName}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      file: `public/${req.files.file.name}`
    });
  });
});

module.exports = router;
