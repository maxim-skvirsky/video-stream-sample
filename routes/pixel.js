const express = require("express");
const router = express.Router();

router.get("/impression-pixel", function(req, res) {
  console.log("impression-pixel get");
  res.status(200).send();
});

router.post("/impression-pixel", function(req, res) {
  console.log("impression-pixel post");
});

router.get("/start", function(req, res) {
  console.log("start get");
  res.status(200).send();
});

router.post("/start", function(req, res) {
  console.log("start post");
});

router.get("/complete", function(req, res) {
  console.log("complete get");
  res.status(200).send();
});

router.get("/complete", function(req, res) {
  console.log("complete post");
});

router.get("/fullscreen", function(req, res) {
  console.log("fullscreen get");
  res.status(200).send();
});

router.post("/fullscreen", function(req, res) {
  console.log("fullscreen post");
});

router.get("/clicked", function(req, res) {
  console.log("video clicked get");
  res.status(200).send();
});

router.post("/clicked", function(req, res) {
  console.log("video clicked post");
});

module.exports = router;
