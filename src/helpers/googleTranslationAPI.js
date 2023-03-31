const translatte = require("translate-google");

const googleTranslation = async (data) => {
  return await Promise.all(
    data.map((obj) => {
      return translatte(obj, {
        from: "auto",
        to: "uk",
      })
        .then((res) => {
          if (obj.text) {
            obj.textUA = res.text;
          }
          if (obj.retwite) {
            obj.retwite.retwiteTextUA = res.retwite.retwitteText;
          }
          if (obj.repost) {
            obj.repost.repostTextUA = res.repost.repostText;
          }

          return data;
        })
        .catch((err) => {
          console.error("GoogleTranslate Servise:", err.code || err);
        });
    })
  );
};
module.exports = googleTranslation;
