import { Markup, Telegraf } from "telegraf";
import "dotenv/config";

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  ctx.replyWithHTML(
    `I can help you create and manage Heroku apps 

<strong>Go to heroku and get your heroku api key</strong>`,
    Markup.inlineKeyboard([
      Markup.button.url(
        "Heroku API",
        "https://dashboard.heroku.com/account/applications/authorizations/new"
      ),
    ])
  );
});
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
