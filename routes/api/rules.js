const express = require("express");
const router = express.Router();
const cache = require("../../utils/cache");

router.get("/", (req, res) => {
  res.json(cache.getAll());
});

router.get("/reload", (req, res) => {
  cache.reloadRules();
  res.status(200).json({ rulesreloaded: "success" });
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
});

router.post("/", (req, res) => {
  let result = cache.addToCache({
    appname: req.body.appname,
    geo_include: req.body.geo_include,
    geo_exclude: req.body.geo_exclude,
    ad: req.body.ad
  });
  res.json(result);
});

router.delete("/:id", (req, res) => {
  let result = cache.delete(req.params.id);
  if (result) {
    res.status(200).json({ ruledelete: "successfully deleted" });
  } else {
    res.status(404).json({ norulewithidfound: "error! no rule found" });
  }
});

module.exports = router;
