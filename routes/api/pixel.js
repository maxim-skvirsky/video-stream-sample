const express = require("express");
const router = express.Router();

router.get("/impression-pixel", function(req, res) {
  console.log("impression-pixel get " + req.query);
  console.log(req.query);

  res.status(200).send();
});

router.post("/impression-pixel", function(req, res) {
  console.log("impression-pixel post " + req.query);
});

router.get("/start", function(req, res) {
  console.log("start get " + req.query);
  console.log(req.query);

  res.status(200).send();
});

router.post("/start", function(req, res) {
  console.log("start post " + req.query);
});

router.get("/complete", function(req, res) {
  console.log("complete get " + req.query);
  console.log(req.query);

  res.status(200).send();
});

router.get("/complete", function(req, res) {
  console.log("complete post " + req.query);
});

router.get("/fullscreen", function(req, res) {
  console.log("fullscreen get " + req.query);
  console.log(req.query);

  res.status(200).send();
});

router.post("/fullscreen", function(req, res) {
  console.log("fullscreen post " + req.query);
});

router.get("/clicked", function(req, res) {
  console.log("video clicked get " + req.query);
  console.log(req.query);

  res.status(200).send();
});

router.post("/clicked", function(req, res) {
  console.log("video clicked post " + req.query);
});

router.get("/createView", function(req, res) {
  console.log("video createView get " + req.query);
  console.log(req.query);

  res.status(200).send();
});

router.post("/createView", function(req, res) {
  console.log("video createView post " + req.query);
});

module.exports = router;
