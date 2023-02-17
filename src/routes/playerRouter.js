const express = require("express");
const bodyParser = require("body-parser");
const Players = require("../schema/players");
const playerRouter = express.Router();
const Nations = require("../schema/nations");

playerRouter.use(bodyParser.json());

playerRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  next();
});

playerRouter.get("/", async (req, res, next) => {
  const players = await Players.find();
  const positions = [
    "GK",
    "RB",
    "CB",
    "LB",
    "CDM",
    "CM",
    "CAM",
    "RW",
    "LW",
    "ST",
  ];

  const nations = await Nations.find();

  res.render("players/index", {
    title: "Players",
    players,
    positions,
    nations,
  });
});

playerRouter.get("/:playerId", async (req, res, next) => {
  const player = await Players.findById(req.params.playerId);
  res.send(player);
});

playerRouter.post("/", async (req, res, next) => {
  const newPlayer = await Players.create(req.body);
  res.send(newPlayer);
});

playerRouter.put("/:playerId", async (req, res, next) => {
  const player = await Players.findByIdAndUpdate(
    req.params.playerId,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.send(player);
});

playerRouter.delete("/:playerId", async (req, res, next) => {
  const player = await Players.findByIdAndDelete(req.params.playerId);
  res.send(player);
});

module.exports = playerRouter;