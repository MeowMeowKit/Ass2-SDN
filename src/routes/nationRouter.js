const express = require("express");
const bodyParser = require("body-parser");
const Nations = require("../schema/nations");
const Players = require("../schema/players");

const nationRouter = express.Router();

nationRouter.use(bodyParser.json());

nationRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  next();
});

nationRouter.get("/", async (_, res, next) => {
  const nations = await Nations.find();
  res.render("nations/index", { title: "Nations List", nations });
});

nationRouter.get("/:nationId", async (req, res, next) => {
  try {
    const nation = await Nations.findById(req.params.nationId);
    res.send(nation);
  } catch (err) {
    res.render("404page", { title: "404 Page" });
  }
});

nationRouter.post("/", async (req, res, next) => {
  const newNation = await Nations.create(req.body);
  res.send(newNation);
});

nationRouter.put("/:nationId", async (req, res, next) => {
  console.log(req.params.nationId);
  const nation = await Nations.findByIdAndUpdate(
    req.params.nationId,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.send(nation);
});

nationRouter.delete("/:nationId", async (req, res, next) => {
  const players = await Players.find({ nations: req.params.nationId });
  if (players.length > 0) {
    res.redirect("/nations");
    return;
  }
  const nation = await Nations.findByIdAndDelete(req.params.nationId);
  res.send(nation);
});

module.exports = nationRouter;
