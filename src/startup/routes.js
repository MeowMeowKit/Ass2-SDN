const express = require("express");
const nationRouter = require("../routes/nationRouter");
const playerRouter = require("../routes/playerRouter");
const homeRouter = require("../routes/homeRouter");
const mongoose = require("mongoose");

module.exports = function (app) {
    mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
    app.use(express.json());
    app.use("/", homeRouter);
    app.use("/nations", nationRouter);
    app.use("/players", playerRouter);
};
// module.exports = function (app) {
//   mongoose.connect(
//     "mongodb+srv://cuonglcse151508:123456789a@cluster1.olyusek.mongodb.net/test",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   );
//   app.use(express.json());
//   app.use("/", homeRouter);
//   app.use("/nations", nationRouter);
//   app.use("/players", playerRouter);
// };
