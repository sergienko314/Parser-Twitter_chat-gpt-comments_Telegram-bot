This project was created as a scientifically led project and is not commercial in nature.
It solves the following tasks:

1. Parsing Twiitter using the puppeteer npm package (src/service/parserPuppeteer.js).
2. Search and save posts to MongoDB database.
3. Connecting the Telegram bot to be able to subscribe to the latest news on NikName Twitter and start the update process.
4. Connecting the GPT chat to the project. GPT chat allows you to comment on posts related to the stock market, posts of politicians, art objects, etc., as well as translate them into Ukrainian using the translation module. If you wish, you can change the translation language using the translation module settings.

To run the project, you will need to specify the following data in the ENV file.

1. PORT=3000.
2. MONGO_URL= Your URL for the database.
3. TELEGRAM_BOT_TOKEN= Your Telegram bot token can be obtained from FatherOfBot.
4. OPENAI_API_KEY= Get a unique key in your OpenAI account.

To run the project, type npm run dev or npm start at the command line.
Please note that various settings for the puppeteer can be used to trigger the parsing function: usually headless=false for the computer; For server headless=true

the logic for updating the constant updating of posts is written in a separate repository https://github.com/sergienko314/parser-Twitter_update-logic.git
