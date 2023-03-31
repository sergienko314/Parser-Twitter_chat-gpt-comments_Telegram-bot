const { addSubscriptions } = require("../../service/userService.js");
const bot = require("../../telegramBot.js");
const sendMessageSubscribMod = require("./subscribeGpt.js");

const sendMessageSubscribe = async (dbRequest, chatId) => {
  const subscribeOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: `Підпісатісь на ${dbRequest[0]?.nikName}`,
            callback_data: `/subscribe +${dbRequest[0]?.nikName}`,
          },
        ],
      ],
    }),
  };

  return await bot.sendMessage(
    chatId,
    "Якщо нажмешь підпісатісь, я буду відправляти тобі оновлення",
    subscribeOptions
  );
};

bot.on("callback_query", async (msg) => {
  const data = msg.data;

  const chatId = msg.message.chat.id;
  const reqNikName = msg.data.split("+")[1];

  if (data.includes("/subscribe")) {
    const messege = await addSubscriptions(chatId, reqNikName);

    await bot.sendMessage(chatId, messege);
    if (messege.includes("Вітаю") || messege.includes("Ви вже пiдписанi")) {
      return sendMessageSubscribMod(chatId, reqNikName);
    }
  }
});
module.exports = sendMessageSubscribe;
