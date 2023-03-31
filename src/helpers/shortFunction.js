const checNikName = (text) => {
  // console.log("checNikName", text);
  if (!text.includes("@")) {
    return `@${text}`;
  }
  return text;
};

module.exports = checNikName;
