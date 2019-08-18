const express = require("express");
const router = express.Router();

router.get("/impression-pixel", function(req, res) {
  console.log("impression-pixel get " + req);
  res.status(200).send();
});

router.post("/impression-pixel", function(req, res) {
  console.log("impression-pixel post " + req);
});

router.get("/start", function(req, res) {
  console.log("start get " + req);
  res.status(200).send();
});

router.post("/start", function(req, res) {
  console.log("start post " + req);
});

router.get("/complete", function(req, res) {
  console.log("complete get " + req);
  res.status(200).send();
});

router.get("/complete", function(req, res) {
  console.log("complete post " + req);
});

router.get("/fullscreen", function(req, res) {
  console.log("fullscreen get " + req);
  res.status(200).send();
});

router.post("/fullscreen", function(req, res) {
  console.log("fullscreen post " + req);
});

router.get("/clicked", function(req, res) {
  console.log("video clicked get " + req);
  res.status(200).send();
});

router.post("/clicked", function(req, res) {
  console.log("video clicked post " + req);
});

router.get("/createView", function(req, res) {
  console.log("video createView get " + req);
  res.status(200).send();
});

router.post("/createView", function(req, res) {
  console.log("video createView post " + req);
});

module.exports = router;
