const express = require("express");
const bodyParser = require("body-parser");
const Players = require("../schema/players");
const playerRouter = express.Router();
const Nations = require("../schema/nations");
const {
  routeUnAuthProtection,
  routeAdminProtection,
} = require("../middlewares/auth.middleware");

playerRouter.use(bodyParser.json());

playerRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  next();
});

playerRouter.get("/", async (req, res, next) => {
  let players = [];

  if (res.locals.isLogin && res.locals.user.isAdmin) {
    players = await Players.find().populate("nations");
  } else {
    players = await Players.find({ isCaptain: true }).populate("nations");
  }
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
  let players = [];

  if (res.locals.isLogin && res.locals.user.isAdmin) {
    players = await Players.find().populate("nations");
  } else {
    players = await Players.find({ isCaptain: true }).populate("nations");
  }
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
  try {
    const player = await Players.findById(req.params.playerId);
    console.log("player", player);
    res.render("players/detailsPlayer", {
      title: "Player detail",
      player,
      positions,
      nations,
    });
  } catch (err) {
    res.render("404page", { title: "404 Page" });
  }
});

playerRouter.post("/", async (req, res, next) => {
  const newPlayer = await Players.create(req.body);
  res.send(newPlayer);
});

playerRouter.post(
  "/:playerId",
  routeUnAuthProtection,
  async (req, res, next) => {
    Players.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
);

playerRouter.put("/:playerId", routeAdminProtection, async (req, res, next) => {
  const player = await Players.findByIdAndUpdate(
    req.params.playerId,
    {
      $set: req.body,
    }
    // { new: true }
  );
  res.send("Update Player Successfully");
});

playerRouter.delete(
  "/:playerId",
  routeAdminProtection,
  async (req, res, next) => {
    const player = await Players.findByIdAndDelete(req.params.playerId);
    res.send(player);
  }
);

module.exports = playerRouter;
