import Heroku from "heroku-client";
import { deunionize } from "telegraf";
import store from "../store";
import mainMenu from "../ext/mainMenu";

async function herokuAuthentication(tgHerokuClient) {
  tgHerokuClient.on("message", (ctx) => {
    const heroku = new Heroku({ token: deunionize(ctx.message).text });

    heroku
      .get("/account")
      .then((res) => {
        store.isLogin[deunionize(ctx.message).chat.id] = true;
        store.currentUser[deunionize(ctx.message).chat.id] = heroku;
        store.currentUserAccount[deunionize(ctx.message).chat.id] = res;

        mainMenu(ctx, res);
      })
      .catch((err) => {
        // https://devcenter.heroku.com/articles/platform-api-reference#error-responses
        if (err.statusCode === 400) {
          ctx.telegram.sendMessage(
            deunionize(ctx.message).chat.id,
            `Request invalid, validate usage and try again`
          );
        } else if (err.statusCode === 401) {
          ctx.telegram.sendMessage(
            deunionize(ctx.message).chat.id,
            `Invalid credentials 😢\n\n<strong>Please provide the right API Key</strong>`,
            {
              parse_mode: "HTML",
            }
          );
        } else if (err.statusCode === 402) {
          ctx.telegram.sendMessage(
            deunionize(ctx.message).chat.id,
            `Either the account has become delinquent as a result of non-payment, or the account’s payment method must be confirmed to continue`
          );
        } else {
          ctx.telegram.sendMessage(
            deunionize(ctx.message).chat.id,
            `Try again`
          );
        }
      });
  });
}

export default herokuAuthentication;
