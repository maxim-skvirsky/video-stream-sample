const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Rule = require("../../models/Rule");

router.get("/", (req, res) => {
  Rule.find()
    .sort({ appname: 1 })
    .then(rules => {
      res.json(rules);
    })
    .catch(err => res.status(404).json({ norulesfound: "No rules found!" }));
});

router.post("/:id", (req, res) => {
  Rule.findById(req.params.id)
    .then(rule => res.json(rule))
    .catch(err =>
      res
        .status(404)
        .json({ norulesfound: "No rule with found with id " + req.params.id })
    );
});

router.post("/", (req, res) => {
  const newRule = new Rule({
    appname: req.body.appname,
    geo_include: req.body.geo_include,
    geo_exclude: req.body.geo_exclude,
    ad: req.body.ad
  });

  newRule.save().then(rule => res.json(rule));
});

router.delete("/:id", (req, res) => {
  Rule.findById(req.params.id).then(rule => {
    rule
      .remove()
      .then(() => {
        res.json({ success: true });
      })
      .catch(err =>
        res
          .status(404)
          .json({ rulenotfound: "The rule with provided id was not found" })
      );
  });
});

module.exports = router;
