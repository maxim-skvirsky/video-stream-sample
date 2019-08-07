const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.htm"));
});

app.get("/video", function(req, res) {
  const filename = req.query.filename;
  let path;
  if (filename) {
    path = "assets/" + filename;
  }
  try {
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4"
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  } catch (error) {
    return res.status(404).send({ message: "File not found!" });
  }
});

app.get("/vasts", function(req, res) {
  res.type("application/xml").sendfile("vasts/sample.xml");
});

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
