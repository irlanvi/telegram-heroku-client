import { Markup } from "telegraf";
import herokuAuthentication from "../lib/herokuAuthentication";

async function start(tgHerokuClient) {
  tgHerokuClient.start((ctx) => {
    ctx
      .replyWithHTML(
        `I can help you create and manage Heroku apps\n\n<strong>Go to heroku and get your heroku api key</strong>`,
        Markup.inlineKeyboard([
          Markup.button.url(
            "Heroku API",
            "https://dashboard.heroku.com/account/applications/authorizations/new"
          ),
        ])
      )
      .then(() => {
        herokuAuthentication(tgHerokuClient);
      });
  });
}

export default start;
