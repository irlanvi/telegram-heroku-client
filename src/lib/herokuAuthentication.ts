import Heroku from "heroku-client";
import dayjs from "dayjs";
import { deunionize, Markup } from "telegraf";
import store from "../store";

async function herokuAuthenticationn(tgHerokuClient) {
  tgHerokuClient.on("message", (ctx) => {
    const heroku = new Heroku({ token: deunionize(ctx.message).text });

    heroku
      .get("/account")
      .then((res) => {
        const timeFormat = "DD MMMM YYYY hh:mm A";
        store.isLogin[deunionize(ctx.message).chat.id] = true;
        store.currentUser[deunionize(ctx.message).chat.id] = heroku;

        ctx.telegram.sendMessage(
          deunionize(ctx.message).chat.id,
          `<i>Successfully logged in as ${
            res.email
          }</i>\n\n<strong>Name:</strong> <code>${
            res.name
          }</code>\n<strong>Account ID:</strong> <code>${
            res.id
          }</code>\n<strong>Residence:</strong> <code>${
            res.country_of_residence
          }</code>\n\n<strong>Created at:</strong> <code>${dayjs(
            res.created_at
          ).format(
            timeFormat
          )}</code>\n<strong>Last login:</strong> <code>${dayjs(
            res.last_login
          ).format(timeFormat)}</code>\n\nPowered by @${
            process.env.CHANNEL_USERNAME
          } ⚡️`,
          {
            parse_mode: "HTML",
            reply_markup: Markup.inlineKeyboard([
              [Markup.button.callback("Account", "account")],
              [
                Markup.button.callback("Apps", "apps"),
                Markup.button.callback("Deploy", "deploy"),
              ],
              [
                Markup.button.callback("Dyno", "dyno"),
                Markup.button.callback("Teams", "teams"),
              ],
            ]).reply_markup,
          }
        );
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

export default herokuAuthenticationn;
