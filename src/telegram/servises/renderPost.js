const HTMLPosts = require("../../helpers/HTMLPosts");
const bot = require("../../telegramBot");

const renderPost = async (dataBD, chatId, mods) => {
  if (dataBD.length) {
    await dataBD?.map(async (twitt) => {
      if (twitt.img !== null) {
        const photoArray = [];
        const fileOpts = {
          file: "Buffer",
        };

        await twitt.img.map((item, index) => {
          if (index === 0) {
            return photoArray.push({
              type: "photo",

              media: item,

              caption: HTMLPosts(twitt, mods),
              parse_mode: "HTML",
            });
          }
          return photoArray.push({ type: "photo", media: item });
        });
        try {
          return await bot.sendMediaGroup(chatId, photoArray, fileOpts);
        } catch (error) {
          console.log("media error", {
            ...error.response.body,

            ...twitt.img,
          });
        }
      }
      return await bot
        .sendMessage(chatId, HTMLPosts(twitt, mods), {
          parse_mode: "HTML",
        })
        .catch((error) =>
          console.log("massege error", {
            ...error.response.body,
            ...twitt.img,
            ...twitt.text,
          })
        );
    });
  }
};

module.exports = renderPost;
