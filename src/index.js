const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const { parseToken } = require("./middlewares/user.middleware");
const SECRET = require("./constant/secret");
const FileStore = require("session-file-store")(session);

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.static(process.cwd() + "/src/public"));

app.use(
  session({
    name: "session-id",
    secret: SECRET,
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);
app.use(parseToken);

app.use(bodyParser.json());
require("./startup/routes")(app);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
