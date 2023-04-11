const HTMLPosts = (twitt, mods) => {
  const modCII = mods.includes("modCII");
  const modICS = mods.includes("modICS");
  return `<b>${twitt?.name}</b> ${twitt.verification ? "✪" : ""} <a href=\"${
    twitt.link
  }\">${twitt?.nikName}</a> \n\n${
    twitt.haveRetweete
      ? `<pre>🔗Зробив ретвіт</pre>\n<b>${twitt.retwite?.retwitteName}</b> ${
          twitt.retwite?.retwitteVerification ? "✪" : ""
        } <a href=\"${twitt.link}\">${twitt.retwite?.retwitteNikName}</a>\n\n`
      : ""
  }⌚<a href=\"${twitt.link}\">${twitt?.timePublic}</a> \n\n${
    twitt.retwite?.retwitteText
      ? `🇺🇲 Pетвіт: ${twitt.retwite?.retwitteText}\n\n`
      : ""
  }${
    twitt.retwite?.retwiteTextUA
      ? `🇺🇦 Pетвіт: ${twitt.retwite?.retwiteTextUA}\n\n`
      : ""
  }${twitt.text ? `🇺🇲 : ${twitt.text}\n\n` : ""}${
    twitt.textUA ? `🇺🇦 : ${twitt.textUA}\n\n` : ""
  }${
    twitt.haveRepost &&
    (twitt.repost?.repostText ||
      twitt.repost?.repostVideo ||
      twitt.repost?.repostImg ||
      twitt.repost?.repostText)
      ? `<pre>🪪 Зробив репост</pre> <b>${twitt.repost?.repostName}</b> ${
          twitt.repost?.repostVerification ? "✪" : ""
        } <a href=\"${twitt.link}\">${twitt.repost?.repostNikName}</a>\n\n`
      : ""
  }${
    twitt.repost?.repostText ? `🇺🇲 Pепост: ${twitt.repost?.repostText}\n` : ""
  }${
    twitt.repost?.repostText
      ? `🇺🇦 Pепост: ${twitt.repost?.repostTextUA}\n\n`
      : ""
  }${twitt.video ? `<a href=\"${twitt.link}\">🎬Лінк на відео</a>\n\n` : ""}${
    modCII
      ? `Коментар gpt 👩‍🏫: ${
          twitt.comentModCII ||
          "Немає для цого поста, очікуйте оновлення, або оновіть спісок через /subscriptions та виберіть карточку постів 🪪 "
        }\n\n`
      : ""
  }${
    modICS &&
    twitt.comentModICS?.translateComment != null &&
    twitt.comentModICS?.translateComment
      ? `Коментар gpt 🤵‍♂️: ${twitt.comentModICS?.translateComment}\n\n`
      : ""
  }${
    modICS &&
    twitt.comentModICS?.strategy != null &&
    twitt.comentModICS?.investmentStrategy
      ? `📈Торгова стратегія: ${twitt.comentModICS?.strategy}\n\n💸Фінансовий інструмент: ${twitt.comentModICS?.marketTicket}\n`
      : ""
  }`;
};
module.exports = HTMLPosts;
