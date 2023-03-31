const sendMessagePreviewInfo = require("../Massages/previewInfo");
const ProcesSerchPreviewData = require("../servises/serchTwiter");
const sendMessageSubscribe = require("../Massages/subscribe");
const renderPost = require("../servises/renderPost");
const bot = require("../../telegramBot");
const { serchGpt } = require("../../service/gpt");
const { UserTwiterModel } = require("../../db/schemas/UserTelegramSchema");
const { getAllUserMod } = require("../../service/userService");

let startSerch = false;

bot.on("message", async (msg, match) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (
    text &&
    !startSerch &&
    text !== "/start" &&
    text !== "/search" &&
    text !== "/popular" &&
    text !== "send messege for oll users" &&
    text !== "/subscriptions"
  ) {
    const gpReq = await serchGpt(`message from user: ${text}`);
    bot.sendMessage(msg.chat.id, gpReq);
  }
  if (text === "/search") {
    await bot.sendMessage(
      chatId,
      `напиши мне Логин Твитер или имя (пример: Илон Маск) и я посмотрю есть ли у него твитер`
    );
    startSerch = true;

    return;
  }

  if (
    text &&
    startSerch &&
    text !== "/start" &&
    text !== "/search" &&
    text !== "/popular" &&
    text !== "send messege for oll users" &&
    text !== "/subscriptions"
  ) {
    await bot.sendMessage(
      msg.chat.id,
      `Спробую пошукаті когось на ім'я ${text}`
    );
    startSerch = false;

    const previewData = await ProcesSerchPreviewData(text, chatId);
    if (!previewData?.length) {
      return;
    }

    await sendMessagePreviewInfo(previewData[0], chatId);
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  const serchNikName = data.split("+")[1];

  if (data === "/search") {
    startSerch = true;
    return await bot.sendMessage(
      chatId,
      `напиши мне Логин Твитер или имя (пример: Илон Маск) и я посмотрю есть ли у него твитер`
    );
  }
  if (data.includes("/getPosts")) {
    const previewData = await ProcesSerchPreviewData(serchNikName, chatId);
    if (!previewData?.length) {
      return;
    }

    const UserMods = await getAllUserMod(chatId, serchNikName);
    renderPost(previewData.slice(0, 10), chatId, UserMods);
    return setTimeout(() => {
      sendMessageSubscribe(previewData, chatId);
    }, 3000);
  }
});


