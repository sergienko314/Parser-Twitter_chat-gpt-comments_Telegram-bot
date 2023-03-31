require("dotenv").config();
const app = require("./app");
const { connectMongo } = require("./src/db/connectionMongoose");
const PORT = process.env.PORT || 8081;
const start = async () => {
  connectMongo();
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};
start();
