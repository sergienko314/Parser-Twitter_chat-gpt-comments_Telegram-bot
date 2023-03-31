const {
  getOllSubscriptionsById,
  deleteSubscription,
  deleteModInSubscription,
  getAllUserMod,
} = require("../../service/userService");
const bot = require("../../telegramBot");
const sendMessageSubscribMod = require("../Massages/subscribeGpt");

const subscriptionsMessage = async (chatId) => {
  const subscriptionsArray = await getOllSubscriptionsById(chatId);
  const optionsArray = [];
  if (!subscriptionsArray) {
    return bot.sendMessage(
      chatId,
      `Оновіть авторизацію /start, та підпишіться на когось`
    );
  }
  if (!subscriptionsArray.length) {
    return bot.sendMessage(chatId, `Ви не підписані на нікого`);
  }
  for (const nikName of subscriptionsArray) {
    const mods = await getAllUserMod(chatId, nikName);
    const renderButton = mods.map((mod) => {
      const img = () => {
        if (mod === "modCII") {
          return "👩‍🏫🧭📚";
        }
        if (mod === "modICS") {
          return "🤵‍♂️🔎💵";
        }
      };
      if (mod.length) {
        return {
          text: `🗑 mod:${img()}`,
          callback_data: `/delMod +${nikName}+${mod}+${img()}`,
        };
      } else {
        return {
          text: `no mod 🤷‍♀️`,
          callback_data: `/ModList +${nikName}`,
        };
      }
    });

    optionsArray.push([
      {
        text: `🪪 ${nikName}`,
        callback_data: `/getPosts +${nikName}`,
      },
      {
        text: `🗑 ${nikName}`,
        callback_data: `/delete +${nikName}`,
      },
      ...renderButton,
    ]);
  }

  const subscribetionsOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: optionsArray,
    }),
    parse_mode: "HTML",
  };
  bot.sendMessage(chatId, `Ваші Підписки`, subscribetionsOptions);
};

bot.on("message", async (msg, match) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/subscriptions") {
    subscriptionsMessage(chatId);
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  const subNikName = data.split("+")[1];
  const mod = data.split("+")[2];
  const img = data.split("+")[3];
  if (data.includes("/subscriptions")) {
    subscriptionsMessage(chatId);
  }

  if (data.includes("/delete")) {
    const messege = await deleteSubscription(chatId, subNikName);
    bot.sendMessage(chatId, messege);
  }
  if (data.includes("/ModList")) {
    await sendMessageSubscribMod(chatId, subNikName);
  }
  if (data.includes("/delMod")) {
    const messege = await deleteModInSubscription(chatId, subNikName, mod, img);
    bot.sendMessage(chatId, messege);
  }
});
