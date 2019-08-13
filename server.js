const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

const creatives = require("./routes/api/creatives");
const vasts = require("./routes/api/vasts");
const pixel = require("./routes/pixel");

const port = process.env.PORT || 8081;

mongoose
  .connect(db)
  .then(() => console.log("Mongo Db Connected"))
  .catch(err => console.log("Mongo connection error : " + err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// allow cors calls
app.use(cors());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.htm"));
});

app.use("/api/creatives", creatives);
app.use("/api/vasts", vasts);
app.use("/pixel", pixel);

app.get("*", (req, res) => {
  res.sendfile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
