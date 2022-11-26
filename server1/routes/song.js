const router = require("express").Router();

const song = require("../models/song");

router.post("/save", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    catelory: req.body.catelory,
  });

  try {
    const saveSong = await newSong.save();
    return res.status(200).send({ success: true, artist: saveSong });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const data = await album.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, album: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.get("/getAll", async (req, res) => {
  const options = {
    sort: {
      createAt: 1,
    },
  };
  const data = await song.find(options);
  if (data) {
    return res.status(200).send({ success: true, song: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        catelory: req.body.catelory,
      },
      options
    );
    res.status(200).send({ song: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await song.deleteOne(filter);
  if (result) {
    return res.status(200).send({ success: true, smg: "Delete success" });
  } else {
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

module.exports = router;
