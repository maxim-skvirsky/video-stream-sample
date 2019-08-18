const express = require("express");
const fs = require("fs");
const path = require("path");
const reqParser = require("../../utils/requestDataExtract");
const router = express.Router();

const cache = require("../../utils/cache");

const root = path.dirname(require.main.filename);

const serveXMLByName = function(name, adtype, res) {
  let path;
  if (name) {
    path = root + "/vasts/" + adtype + "_" + name;
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

const filterRules = function(appRules) {
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
  return appRules;
};

// @route   GET api/vasts/RewardedVideoAuto
// @desc    return a vast xml according to the set rules. If no matching rule found - retuns empty vast xml
// @access  Public
router.get("/RewardedVideoAuto", (req, res) => {
  const query = reqParser(req.query);
  let appRules = [];
  let adToServe = "none.xml";
  if (query.app_name) {
    appRules = filterRules(cache.getByAppName(query.app_name));
  }
  adToServe = appRules.length > 0 ? appRules[0].ad + ".xml" : adToServe;
  serveXMLByName(adToServe, "rv", res);
});

// @route   GET api/vasts/InterstitialAuto
// @desc    return a vast xml according to the set rules. If no matching rule found - retuns empty vast xml
// @access  Public
router.get("/InterstitialAuto", (req, res) => {
  const query = reqParser(req.query);
  let appRules = [];
  let adToServe = "none.xml";
  if (query.app_name) {
    appRules = filterRules(cache.getByAppName(query.app_name));
  }
  adToServe = appRules.length > 0 ? appRules[0].ad + ".xml" : adToServe;
  serveXMLByName(adToServe, "int", res);
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
