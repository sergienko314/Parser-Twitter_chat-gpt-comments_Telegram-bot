const autoScroll = require("../helpers/autoScrollPuppeteer.js");
const googleTranslation = require("../helpers/googleTranslationAPI.js");
const puppeteer = require("puppeteer");

const getContentPage = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page
    .goto(`https://twitter.com/${url}`, {
      waitUntil: "networkidle2",
    })
    .catch(async (err) => {
      console.log(err);
      await browser.close();
    });

  await page.setViewport({
    width: 1200,
    height: 1500,
  });
  await autoScroll(page);

  const TwitteUserInfo = await page.$$eval("body", (tweets) => {
    const obj = {};
    tweets.map(async (tweet) => {
      const twits = await tweet.querySelector("article");
      const name = await tweet
        .querySelector("div[data-testid='UserName']")
        .querySelectorAll("span")[1].textContent;
      const nikName =
        (await tweet
          .querySelector("div[data-testid='UserName']")
          .querySelectorAll("span")[4].textContent) ||
        (await tweet
          .querySelector("div[data-testid='UserName']")
          .querySelectorAll("span")[5].textContent);
      const verification = await tweet.querySelector(
        'svg[aria-label="Verified account"]'
      );
      const registrationInfo = tweet.querySelector(
        'span[data-testid="UserJoinDate"]'
      ).textContent;
      const foloverInfo = await tweet
        .querySelector('div[class="css-1dbjc4n r-13awgt0 r-18u37iz r-1w6e6rj"]')
        .textContent.replace(/Followers/g, "Followers ");

      obj.twits = Boolean(twits);
      obj.name = name;
      obj.nikName = nikName;
      obj.verification = Boolean(verification);
      obj.registrationTime = registrationInfo;
      obj.foloverInfo = foloverInfo;
    });
    return obj;
  });

  const TwitterNikNameData = await page.$$eval("article", (tweets) => {
    if (!tweets.length) {
      return null;
    }
    const array = [];

    tweets.map(async (tweet) => {
      const time = await tweet.querySelectorAll("time");
      const link = await tweet.querySelectorAll('a[dir="ltr"]');
      const text = await tweet.querySelector("div[lang]");

      const Img = await tweet.querySelectorAll('img[draggable="true"]');

      const video = await tweet.querySelector("video");

      const repost = await tweet.querySelector(
        'div[tabindex="0"][role="link"]'
      );
      const repostName = await repost?.querySelectorAll("span")[1]?.textContent;
      const repostNikName = await repost?.querySelectorAll("span")[3]
        ?.textContent;
      const repostText = await tweet.querySelectorAll(
        'div[data-testid="tweetText"]'
      );
      // const repostImg = await repost?.querySelectorAll('img[draggable="true"]');

      const repostVideo = await repost?.video;
      const repostVerification = await repost?.querySelector(
        'svg[aria-label="Подлинная учетная запись"]'
      );

      /* * */
      const retwitte = await tweet.querySelector(
        'span[data-testid="socialContext"]'
      );
      const retviteName = await tweet.querySelectorAll("span")[3].textContent;
      const retviteNikName = await tweet.querySelectorAll("span")[5]
        .textContent;
      const retwitteVerification = await tweet.querySelectorAll(
        'svg[aria-label="Подлинная учетная запись"]'
      );
      const retwiteLink = await tweet.querySelectorAll("a")[4]?.href;

      const photoArray = [
        Boolean(!repost) && Img[1]?.src,
        Img[2]?.src,
        Img[3]?.src,
        Img[4]?.src,
        Img[5]?.src,
        video?.poster,
      ];
      const Photos = photoArray.filter((el) => el != null && el !== false);
      array.push({
        timePublic: `${time[0]?.dateTime.split("T")[0]} ${
          time[0]?.dateTime.split("T")[1].split(".")[0]
        }`,
        time: time[0]?.dateTime,
        link: retwitte ? retwiteLink : link[0]?.href,
        text: retwitte ? null : text?.textContent,
        video: Boolean(video),
        videoPoster: video?.poster,
        haveRepost: Boolean(repost),
        haveRetweete: Boolean(retwitte),

        img: Photos.length ? Photos : null,

        retwite: retwitte && {
          retwitteName: retviteName,
          retwitteNikName: retviteNikName,
          retwitteLink: link[1]?.href,
          retwitteTime: `${time[0]?.dateTime.split("T")[0]} ${
            time[0]?.dateTime.split("T")[1].split(".")[0]
          }`,
          retwitteText: text?.textContent,
          retwitteVerification: Boolean(retwitteVerification),
        },
        repost: repost && {
          repostVerification: Boolean(repostVerification),
          repostName: repostName,
          repostNikName: repostNikName,
          repostTime: `${time[1]?.dateTime.split("T")[0]} ${
            time[0]?.dateTime.split("T")[1].split(".")[0]
          }`,
          repostText: repostText[1]?.textContent,
          repostVideo: repostVideo?.poster,
        },
      });
    });

    return array;
  });
  await browser.close();

  if (!TwitterNikNameData) {
    return null;
  }

  const result = await googleTranslation(TwitterNikNameData);

  const arrNew = result[0].map((item) => {
    return {
      ...item,
      name: TwitteUserInfo?.name,
      nikName: TwitteUserInfo?.nikName,
      verification: TwitteUserInfo?.verification,
      registrationTime: TwitteUserInfo?.registrationTime,
      foloverInfo: TwitteUserInfo?.foloverInfo,
    };
  });
  return arrNew;
};

module.exports = { getContentPage };
