const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { errorHandler } = require("./src/helpers/apiHelpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

require("./src/telegramBot");
require("./src/telegram/Massages/subscribe");
require("./src/telegram/Massages/popular");
require("./src/telegram/routes/search");
require("./src/telegram/routes/subscriptions");
require("./src/service/userService");
require("./src/service/postsService");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.use(errorHandler);

module.exports = app;
