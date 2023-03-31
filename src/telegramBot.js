// require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const options = require("./helpers/optionsButton");
const { createUser } = require("./service/userService");

bot.on("message", async (msg, match) => {
  const chatId = msg.chat.id;

  const text = msg.text;
  const nikName = msg.chat.first_name;

  if (text === "/start") {
    await createUser(msg.chat);
    await bot.sendMessage(
      chatId,
      `Привіт ${nikName}, я бот якій допоможе тобі слідкуваті за новинамі в Twitter, надішли мені @nikneme або просто імя, я буду надсилати тобі його твіти українською мовою та орегіналом. Використовуй підпіску з коментарями Chat GPT і побачішь на що здатен цей чат, отримуй інвестецийні поради та дізнайся більше деталей стосовно думкі автора. `,
      options.startOptions
    );
    await bot.sendVideo(chatId, "https://t.me/sergiyenkochanal/566");
  }
});

bot.setMyCommands([
  {
    command: "/start",
    description: "Привітання та загальна інформація",
  },
  {
    command: "/search",
    description: "Знайти тветер и подписаться",
  },
  {
    command: "/subscriptions",
    description: "Мої підписки",
  },
  {
    command: "/popular",
    description: "Популярні",
  },
]);

module.exports = bot;
