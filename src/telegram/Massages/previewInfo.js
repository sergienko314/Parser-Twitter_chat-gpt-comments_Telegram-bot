const bot = require("../../telegramBot");

const sendMessagePreviewInfo = async (previewData, chatId) => {
  const subscribeOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: `Подівитись останні пости ${previewData.nikName}`,
            callback_data: `/getPosts +${previewData.nikName}`,
          },
        ],
      ],
    }),
    parse_mode: "HTML",
  };
  return await bot.sendMessage(
    chatId,
    `<b>${previewData?.name}</b> ${
      previewData.verification ? "✪" : ""
    } <a href=\"${previewData.link}\">${previewData?.nikName}</a> \n${
      previewData?.registrationTime ? previewData?.registrationTime : ""
    }\n${previewData?.foloverInfo}`,
    subscribeOptions
  );
};

module.exports = sendMessagePreviewInfo;
