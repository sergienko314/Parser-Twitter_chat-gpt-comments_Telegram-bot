const mongoose = require("mongoose");
require("dotenv").config();
const exit = require("node:process");

const connectMongo = async () => {
 await mongoose.set("strictQuery", false);
 return mongoose
  .connect(process.env.MONGO_URL, {
   useNewUrlParser: true,
  })
  .then(() => console.log("Database MONGO connection successful"))
  .catch((err) => {
   console.log("DB error", err);
   exit(1);
  });
};

module.exports = {
 connectMongo,
};

// const connectMongo = async () => {
//  await mongoose.set("strictQuery", false);
//  await mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//  });
// };
//
