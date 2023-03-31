const mongoose = require("mongoose");
const { Schema } = mongoose;

const postTwiterShema = new Schema({
  createdAt: {
    type: String,
  },

  updateAt: { type: String },
  name: { type: String, required: true },
  nikName: { type: String, required: true },
  img: { type: Array },
  timeId: { type: String, required: true },
  timePublic: { type: String },
  retwite: { type: Object, required: false },
  repost: { type: Object, required: false },
  time: { type: String, required: true },
  link: { type: String },
  text: { type: String },
  textUA: { type: String },
  video: { type: Boolean },

  videoPoster: { type: String },
  haveRepost: { type: Boolean },
  haveRetweete: { type: Boolean },
  verification: { type: Boolean },
  registrationTime: { type: String },
  foloverInfo: { type: String },
  comentModCII: { type: String },
  comentModICS: { type: Object },
});

const TwitterPostModel = mongoose.model("db_Twitter_posts", postTwiterShema);

module.exports = { TwitterPostModel };
