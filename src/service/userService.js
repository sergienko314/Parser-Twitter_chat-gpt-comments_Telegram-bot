const { TwitterPostModel } = require("../db/schemas/TwitterPostsModel");
const { UserTwiterModel } = require("../db/schemas/UserTelegramSchema");

const createUser = async (msgChat) => {
  const findUser = await UserTwiterModel.findOne({
    chatId: msgChat.id,
  });
  if (!findUser) {
    return await UserTwiterModel.create({
      chatId: msgChat.id,
      first_name: msgChat.first_name,
      last_name: msgChat.last_name,
      username: msgChat.username,

      subscriptions: [],
    });
  }
};

const addSubscriptions = async (chatId, reqNikName) => {
  const user = await UserTwiterModel.findOne({ chatId }).exec();

  if (!user) {
    return `обновите настроку бота нажав /start, и снова нажмите на кновку "Підписатись на"`;
  }

  const subscriptionExists = user.subscriptions.some(
    (subscription) => subscription.nikName === reqNikName
  );

  if (subscriptionExists) {
    return `Ви вже пiдписанi на ${reqNikName}`;
  }
  const lastPost = await TwitterPostModel.find({ nikName: reqNikName })
    .sort({ createdAt: -1 })

    .limit(1)
    .exec();

  await UserTwiterModel.findOneAndUpdate(
    { chatId: chatId },
    {
      $push: {
        subscriptions: {
          nikName: reqNikName,

          timeUpdate: lastPost[0]?.timeId || String(new Date().getTime()),
        },
      },
    },
    { new: true }
  ).catch((err) => {
    console.log(err);
  });

  return `Вітаю, ви підписались на ${reqNikName}`;
};

const deleteSubscription = async (chatId, subNikName) => {
  const user = await UserTwiterModel.findOne({ chatId: chatId }).exec();
  const arrayUserSubscriptions = user?.subscriptions.map(
    (infoObg) => infoObg.nikName
  );
  const switchsIncludesUserSubscrip =
    arrayUserSubscriptions.includes(subNikName);
  if (!switchsIncludesUserSubscrip) {
    return `Ви не підписані на ${subNikName}`;
  }

  if (switchsIncludesUserSubscrip) {
    UserTwiterModel.findOneAndUpdate(
      { chatId: chatId },
      {
        $pull: {
          subscriptions: { nikName: subNikName },
        },
      },
      { new: true }
    )
      .then((user) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return `Ви більше не підписані на ${subNikName}`;
};

const addModInSubscription = async (chatId, reqNikName, mod, img) => {
  try {
    const user = await UserTwiterModel.findOne({ chatId }).exec();
    const subscription = user.subscriptions.find(
      (sub) => sub.nikName === reqNikName
    );

    if (subscription) {
      if (subscription.mod.includes(mod)) {
        return `Ви вже підписані на mod ${img} для постів ${reqNikName}`;
      } else {
        subscription.mod.push(mod);
        subscription.timeUpdate = new Date().getTime();
        await user.save();
        return `Вітаю, ви підписались на mod ${img} для постів ${reqNikName}`;
      }
    } else {
      return `Користувача ${reqNikName} у ваших підпісках не знайдено`;
    }
  } catch (err) {
    console.log(err);
    return "Під час обробки запиту сталась помилка";
  }
};

const deleteModInSubscription = async (chatId, reqNikName, mod, img) => {
  try {
    const user = await UserTwiterModel.findOne({ chatId }).exec();
    const subscription = user.subscriptions.find(
      (sub) => sub.nikName === reqNikName
    );

    if (subscription) {
      if (!subscription.mod.includes(mod)) {
        return `Ви не підписані на mod ${img} для постів ${reqNikName}`;
      } else {
        const newArrayMods = await subscription.mod.filter((i) => i !== mod);
        subscription.mod = newArrayMods;
        subscription.timeUpdate = new Date().getTime();
        await user.save();
        return `Вітаю, ви відпідписались від mod ${img} для постів ${reqNikName}`;
      }
    } else {
      return `Користувача ${reqNikName} не знайдено`;
    }
  } catch (err) {
    console.log(err);
    return "Під час обробки запиту сталась помилка";
  }
};

const getAllUserMod = async (chatId, nikName) => {
  const user = await UserTwiterModel.findOne({ chatId }).exec();
  const modArrai = user.subscriptions
    .filter((sub) => sub.nikName === nikName)
    .map((sub) => sub.mod);
  return modArrai.flat(1);
};

const getOllSubscriptionsById = async (chatId) => {
  const userSubscriptions = await UserTwiterModel.findOne({ chatId: chatId });

  return userSubscriptions?.subscriptions.map((subsObg) => subsObg.nikName);
};

module.exports = {
  addSubscriptions,
  deleteSubscription,
  addModInSubscription,
  deleteModInSubscription,
  createUser,
  getAllUserMod,
  getOllSubscriptionsById,
};
