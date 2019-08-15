const express = require("express");
const fs = require("fs");
const path = require("path");
const reqParser = require("../../utils/requestDataExtract");
const router = express.Router();

const cache = require("../../utils/cache");

// const mongoose = require("mongoose");
// const Rule = require("../../models/Rule");

const root = path.dirname(require.main.filename);

const serveXMLByName = function(name, res) {
  let path;
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
};

// @route   GET api/vasts/auto
// @desc    return a vast xml according to the set rules. If no matching rule found - retuns empty vast xml
// @access  Public
router.get("/auto", (req, res) => {
  const query = reqParser(req.query);
  let appRules = [];
  let adToServe = "none.xml";
  if (query.app_name) {
    appRules = cache.getByAppName(query.app_name);
    appRules
      .filter(rule => {
        if (rule.geo_include.indexOf(query.geodata.country) > -1) {
          return rule;
        }
      })
      .filter(rule => {
        if (rule.geo_exclude.indexOf(query.geodata.country) === -1) {
          return rule;
        }
      });
  }
  adToServe = appRules.length > 0 ? appRules[0].ad + ".xml" : adToServe;
  serveXMLByName(adToServe, res);
});

// @route   GET api/vasts/:name
// @desc    return a vast xml by its name
// @access  Public
router.get("/vast/:name", (req, res) => {
  const name = req.params.name;
  serveXMLByName(name, res);
});

// @route   GET api/vasts/vast/none
// @desc    return an empty vast xml
// @access  Public
router.get("/vast/none", (req, res) => {
  res.type("application/xml").sendFile(root + "/vasts/none.xml");
});

// @route   POST api/vast
// @desc    upload a vast xml file
// @access  Public
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
