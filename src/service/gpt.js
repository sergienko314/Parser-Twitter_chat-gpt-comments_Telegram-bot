const translatte = require("translate-google");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const serchGpt = async (req) => {
  if (!req || req === "") {
    return "no comment";
  }
  const completion = await openai.createCompletion(
    {
      model: "text-davinci-003",
      prompt: req,
      max_tokens: 2048,
      temperature: 1,
    },
    {
      headers: {
        "Example-Header": "example",
      },
    }
  );

  return completion.data.choices[0].text
    ? completion.data.choices[0].text
    : null;
};

const serchModICS = async (twitt, uniqueValues) => {
  if (uniqueValues.includes("modICS")) {
    const getGptComent = async () => {
      const response = await serchGpt(
        `role for gpt chat: investment advisor, news message:${
          twitt.text
        }, repost:${
          twitt.repostText || twitt.retwitteText
        }, return response in the folloving parsable JSON format: {"commetn": text 100 simvol,"investmentStrategy || false": Boolian,"marketTicket":index,strategy: buy/sel || false,} || null if no strategy`
      );
      if (response) {
        const { comment, marketTicket, investmentStrategy, strategy } =
          JSON.parse(response);
        const translateComment = await translatte(comment, {
          from: "auto",
          to: "uk",
        }).catch((error) => {
          console.log(error);
          return null;
        });

        return {
          translateComment: translateComment ? translateComment : null,
          marketTicket: marketTicket ? marketTicket : null,
          investmentStrategy: investmentStrategy ? investmentStrategy : null,

          strategy: strategy ? strategy : null,
        };
      } else {
        return null;
      }
    };
    try {
      return await getGptComent();
    } catch (error) {
      console.log(error);
      return await getGptComent();
    }
  }
};

const serchModCII = async (twitt, uniqueValues) => {
  if (uniqueValues.includes("modCII")) {
    const respons = await serchGpt(
      `role for chat gpt: smart interlocutor, post from ${twitt.name} message:${
        twitt.text
      }, repost:${
        twitt.repostText || twitt.retwitteText
      }, return {commetn: text max 150 simvol}`
    );
    const translateComment = await translatte(respons, {
      from: "auto",
      to: "uk",
    }).catch((error) => {
      console.log(error);
      return null;
    });
    return translateComment;
  }
  return null;
};

module.exports = {
  serchGpt,
  serchModICS,
  serchModCII,
};
