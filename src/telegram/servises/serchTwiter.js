const { getGoogleSerch } = require("../../helpers/googleSearchAPI");
const checNikName = require("../../helpers/shortFunction");
const { getContentPage } = require("../../service/parserPuppeteer");
const {
  getTwitterByNikName,
  createTwitters,
} = require("../../service/postsService");
const bot = require("../../telegramBot");

const ProcesSerchPreviewData = async (text, chatId) => {
  let resalt = null;

  const serchReq = await checNikName(String(text));
  const dbreqSerch = await getTwitterByNikName(checNikName(String(serchReq)));
  resalt = dbreqSerch;

  if (resalt) {
    return resalt;
  }

  const nikName = await getGoogleSerch(text);
  const dbReqNikName = await getTwitterByNikName(checNikName(String(nikName)));
  resalt = dbReqNikName;
  if (resalt) {
    return resalt;
  } else {
    await bot.sendMessage(
      chatId,
      `Все під контролем, шукаю на саті ${
        nikName || serchReq
      }, час очікування 25 секунд`
    );
    const getSkrinContent = async () => {
      return (
        (await getContentPage(`${serchReq}`)) ||
        (await getContentPage(`@${nikName}`))
      );
    };
    resalt = await getSkrinContent();

    if (resalt?.length) {
      await createTwitters(resalt);
      return resalt;
    } else {
      return await bot.sendMessage(
        chatId,

        `Акаунт із таким ім'ям не знайдено`
      );
    }
  }
};

module.exports = ProcesSerchPreviewData;
