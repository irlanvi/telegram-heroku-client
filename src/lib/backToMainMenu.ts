import { deunionize, Markup } from "telegraf";
import dayjs from "dayjs";
import store from "../store";

function backToMainMenu(tgHerokuClient) {
  tgHerokuClient.action("backToMainMenu", async (ctx) => {
    console.log(ctx);
    const account = store.currentUserAccount[ctx.update.callback_query.from.id];
    const timeFormat = "DD MMMM YYYY hh:mm A";

    ctx.editMessageText(
      `<i>Successfully logged in as ${
        account.email
      }</i>\n\n<strong>Name:</strong> <code>${
        account.name
      }</code>\n<strong>Account ID:</strong> <code>${
        account.id
      }</code>\n<strong>Residence:</strong> <code>${
        account.country_of_residence
      }</code>\n\n<strong>Created at:</strong> <code>${dayjs(
        account.created_at
      ).format(timeFormat)}</code>\n<strong>Last login:</strong> <code>${dayjs(
        account.last_login
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
  });
}

export default backToMainMenu;
