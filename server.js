const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

const creatives = require("./routes/api/creatives");
const vasts = require("./routes/api/vasts");

// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.htm"));
});

app.use("/api/creatives", creatives);
app.use("/api/vasts", vasts);

app.get("/impression-pixel", function(req, res) {
  console.log("impression-pixel");
});

app.get("/start", function(req, res) {
  console.log("start");
});

app.get("/complete", function(req, res) {
  console.log("complete");
});

app.get("/fullscreen", function(req, res) {
  console.log("fullscreen");
});

app.get("/clicked", function(req, res) {
  console.log("video clicked");
});

app.listen(process.env.PORT || 8081, function() {
  console.log("Listening on port 8000!");
});
