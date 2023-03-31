const { addModInSubscription } = require("../../service/userService");
const bot = require("../../telegramBot");

const sendMessageSubscribMod = async (chatId, nikName) => {
  const subscribeMarkerOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: `Gpt Mod: iнвестецiйний консультант 🤵‍♂️🔎💵 "${nikName}"`,
            callback_data: `/subMarker +modICS+${nikName}+🤵‍♂️🔎💵`,
          },
        ],
        [
          {
            text: `Gpt Mod: Коментатор поста 👩‍🏫🧭📚 "${nikName}"`,
            callback_data: `/subMarker +modCII+${nikName}+👩‍🏫🧭📚`,
          },
        ],
      ],
    }),
  };

  return await bot.sendMessage(
    chatId,
    "Ти можеш вибрати модифікацію з коментарями до поста від chat gpt, як від інвестиційного консультанта або просто всезнайки",
    subscribeMarkerOptions
  );
};

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  const reqNikName = msg.data.split("+")[2];
  const mod = msg.data.split("+")[1];
  const img = msg.data.split("+")[3];

  if (data.includes("/subMarker")) {
    const messege = await addModInSubscription(chatId, reqNikName, mod, img);
    return bot.sendMessage(chatId, messege);
  }
});

module.exports = sendMessageSubscribMod;
