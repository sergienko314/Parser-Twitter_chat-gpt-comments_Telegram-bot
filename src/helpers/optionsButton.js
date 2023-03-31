module.exports = {
  startOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Знайти твітер", callback_data: "/search" }],
        [{ text: "Мої підписки", callback_data: "/subscriptions" }],
        [{ text: "Популярні", callback_data: "/popular" }],
      ],
    }),
  },
};
