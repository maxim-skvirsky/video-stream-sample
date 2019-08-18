const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const root = path.dirname(require.main.filename);

// @route   GET api/video/:videfilename
// @desc    stream a video by the video filename
// @access  Public
router.get("/video/:videofilename", (req, res) => {
  console.log("video request");
  console.log({ req });

  const filename = req.params.videofilename;
  let file_path;
  if (filename) {
    file_path = root + "/assets/" + filename;
  } else {
    return res.status(404).send({ message: "File not found!" });
  }
  try {
    const stat = fs.statSync(file_path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(file_path, { start, end });
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
      fs.createReadStream(file_path).pipe(res);
    }
  } catch (error) {
    return res.status(404).send({ message: "File not found!" });
  }
});

// @route   GET api/video/:videfilename
// @desc    stream a video by the video filename
// @access  Public
router.get("/image/:imagename", (req, res) => {
  console.log("image request : " + req);
  console.log({ req });

  const filename = req.params.imagename;
  let file_path;
  if (filename) {
    file_path = root + "/assets/images/" + filename;
    res.sendFile(file_path);
  } else {
    return res.status(404).send({ message: "File not found!" });
  }
});

// @route   GET api/creatives/test
// @desc    check if the api root is working properly
// @access  Public
router.get("/test", (req, res) => {
  res.send("all good");
});

module.exports = router;
