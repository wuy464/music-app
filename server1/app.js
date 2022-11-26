const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

app.use(cors({ origin: true }));
app.use(express.json());

const { default: mongoose } = require("mongoose");
app.get("/", (req, res) => {
  return res.json("Log");
});

//user authencation route
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

//Artitst router
const artistRoutes = require("./routes/artists");
app.use("/api/artists", artistRoutes);
//Song router
const songRoutes = require("./routes/song");
app.use("/api/songs", songRoutes);
//Ablum router
const albumRoutes = require("./routes/album");
app.use("/api/albums", albumRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });

app.listen(4000, () => console.log("port 4000"));
