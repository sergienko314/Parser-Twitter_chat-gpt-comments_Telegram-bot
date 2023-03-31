const autoScroll = (page) => {
  // evaluate some javascript
  return page.evaluate(function () {
    return new Promise(function (resolve, reject) {
      // const totalHeight = 3000;
      const distance = 1000;
      const timer = setInterval(function () {
        //   const scrollHeight = document.body.scrollHeight;

        window.scrollBy(0, distance);
        //   totalHeight += distance;

        //   if (totalHeight >= scrollHeight) {
        clearInterval(timer);
        resolve();
        //   }
      }, 1000);
    });
  });
};
module.exports = autoScroll;
