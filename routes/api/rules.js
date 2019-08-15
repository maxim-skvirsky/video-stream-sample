const express = require("express");
const router = express.Router();
const cache = require("../../utils/cache");
// const mongoose = require("mongoose");

// const Rule = require("../../models/Rule");

router.get("/", (req, res) => {
  res.json(cache.getAll());
  //   Rule.find()
  //     .sort({ appname: 1 })
  //     .then(rules => {
  //       res.json(rules);
  //     })
  //     .catch(err => res.status(404).json({ norulesfound: "No rules found!" }));
});

router.get("/:id", (req, res) => {
  let result = cache.getById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res
      .status(404)
      .json({ norulesfound: "No Rule found with id " + req.params.id });
  }
  //   Rule.findById(req.params.id)
  //     .then(rule => res.json(rule))
  //     .catch(err =>
  //       res
  //         .status(404)
  //         .json({ norulesfound: "No rule with found with id " + req.params.id })
  //     );
});

router.post("/", (req, res) => {
  let result = cache.addToCache({
    appname: req.body.appname,
    geo_include: req.body.geo_include,
    geo_exclude: req.body.geo_exclude,
    ad: req.body.ad
  });
  //   const newRule = new Rule({
  //     appname: req.body.appname,
  //     geo_include: req.body.geo_include,
  //     geo_exclude: req.body.geo_exclude,
  //     ad: req.body.ad
  //   });
  res.json(result);
});

router.delete("/:id", (req, res) => {
  let result = cache.delete(req.params.id);
  if (result) {
    res.status(200).json({ ruledelete: "successfully deleted" });
  } else {
    res.status(404).json({ norulewithidfound: "error! no rule found" });
  }
  //   Rule.findById(req.params.id).then(rule => {
  //     rule
  //       .remove()
  //       .then(() => {
  //         res.json({ success: true });
  //       })
  //       .catch(err =>
  //         res
  //           .status(404)
  //           .json({ rulenotfound: "The rule with provided id was not found" })
  //       );
  //   });
});

module.exports = router;
