const bot = require("../../telegramBot");

const sendMessagePopular = async (chatId) => {
  const popularArray = [
    { nikName: "@financialjuice", name: "Breaking Market News" },
    { nikName: "@JoeBiden", name: "Joe Biden" },
    { nikName: "@elonmusk", name: "Elon Musk" },
    { nikName: "@Tesla", name: "Tesla" },
    { nikName: "@joerogan", name: "Joe Rogan" },
    { nikName: "@BarackObama", name: "Barack Obama" },
    { nikName: "@BillGates", name: "Bill Gates" },
    { nikName: "@SpaceX", name: "SpaceX" },
  ];

  const optionsArray = [];
  popularArray.map((twitt) => {
    return optionsArray.push([
      {
        text: `🪪 ${twitt.name}`,
        callback_data: `/getPosts +${twitt.nikName}`,
      },
      {
        text: `🔔 на ${twitt.name}`,
        callback_data: `/subscribe +${twitt.nikName}`,
      },
    ]);
  });
  const subscribetionsOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: optionsArray,
    }),
    parse_mode: "HTML",
  };
  bot.sendMessage(
    chatId,
    `Список акаунтів яки ми вам рекомендуємо`,
    subscribetionsOptions
  );
};

bot.on("message", async (msg, match) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text === "/popular") {
    sendMessagePopular(chatId);
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;

  if (data === "/popular") {
    sendMessagePopular(chatId);
  }
});

module.exports = sendMessagePopular;
