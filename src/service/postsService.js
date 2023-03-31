const { TwitterPostModel } = require("../db/schemas/TwitterPostsModel");
const format = require("date-format");
const { UserTwiterModel } = require("../db/schemas/UserTelegramSchema");
const renderPost = require("../telegram/servises/renderPost");
const { serchModICS, serchModCII } = require("./gpt");
const countPost = 10;
const limitDelete = 10;

const createTwitters = async (array) => {
  const reqNikName = array[0].nikName;
  const FindAllModsUser = await UserTwiterModel.find({}).exec();
  const allModsNikName = FindAllModsUser.map((item) =>
    item.subscriptions.map(({ nikName, mod }) => {
      if (nikName === reqNikName) {
        return mod;
      }
      return;
    })
  );
  const flatModArray = allModsNikName.flat(Infinity).filter(Boolean); // висіпаємо всі значення та фільтруємо undefined
  const uniqueValues = [...new Set(flatModArray)];

  for (let i = 0; i < array?.length; i++) {
    const modICS = await serchModICS(array[i], uniqueValues);

    const modCII = await serchModCII(array[i], uniqueValues);

    if (i < countPost) {
      TwitterPostModel.insertMany({
        timePublic: array[i].timePublic,
        time: array[i].time,

        timeId: new Date(array[i].time).getTime(),
        text: array[i].text,
        video: array[i].video,
        haveRepost: array[i].haveRepost,
        haveRetweete: array[i].haveRetweete,
        img: array[i].img,
        retwite: array[i].retwite,
        repost: array[i].repost,
        textUA: array[i].textUA,
        name: array[i].name,
        nikName: array[i].nikName,
        verification: array[i].verification,
        registrationTime: array[i].registrationInfo,
        foloverInfo: array[i].foloverInfo,
        createdAt: format(`dd-MM-yy hh:mm:ss.${i}0`, new Date()),

        link: array[i].link,

        videoPoster: array[i].videoPoster,
        comentModCII: modCII,
        comentModICS: modICS,
      });
    }
  }
};

const getTwitterByNikName = async (nikName) => {
  const data = await TwitterPostModel.find({ nikName: nikName })
    .sort({ createdAt: -1 })
    .limit(limitDelete)
    .exec();
  return data.length ? data : null;
};

const updatePostList = async () => {
  const allUsers = await UserTwiterModel.find();
  allUsers.forEach((user) => {
    user.subscriptions.map(async ({ nikName, timeUpdate, mod }) => {
      const allPosts = await TwitterPostModel.find({ nikName: nikName });
      const youngestPost = allPosts.sort((a, b) => b.timeId - a.timeId);
      const postUpdate = allPosts.filter((post) => post.timeId > timeUpdate);

      if (postUpdate.length) {
        await renderPost(postUpdate, user.chatId, mod);
        await UserTwiterModel.findOneAndUpdate(
          { chatId: user.chatId },
          {
            $pull: {
              subscriptions: { nikName: nikName },
            },
          },

          { new: true }
        ).catch((err) => {
          console.log(err);
        });
        await UserTwiterModel.findOneAndUpdate(
          { chatId: user.chatId },
          {
            $push: {
              subscriptions: {
                nikName: nikName,
                timeUpdate: youngestPost[0].timeId,
                mod: mod,
              },
            },
          },

          { new: true }
        )

          .then((user) => {})
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
};

setInterval(updatePostList, 3 * 60 * 1000);

module.exports = {
  getTwitterByNikName,
  createTwitters,
};
