const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

const creatives = require("./routes/api/creatives");
const vasts = require("./routes/api/vasts");
const pixel = require("./routes/pixel");

const port = process.env.PORT || 8081;

app.use(cors());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.htm"));
});

app.use("/api/creatives", creatives);
app.use("/api/vasts", vasts);
app.use("/pixel", pixel);

app.listen(port, function() {
  console.log("Listening on port " + port);
});
