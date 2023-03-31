const mongoose = require("mongoose");
const { Schema } = mongoose;
const format = require("date-format");
format("dd-MM-yy hh:mm:ss.SSS", new Date());

const userTwiterShema = new Schema({
  createdAt: {
    type: String,
    default: format("dd-MM-yy hh:mm:ss.SSS", new Date()),
  },
  updateAt: { type: String },
  chatId: { type: Number },
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  subscriptions: [
    {
      nikName: String,
      timeUpdate: String,
      mod: [String],
    },
  ],
});

const UserTwiterModel = mongoose.model("db_Twitter_users", userTwiterShema);

module.exports = { UserTwiterModel };
