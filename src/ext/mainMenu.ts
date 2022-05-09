import { deunionize, Markup } from "telegraf";
import dayjs from "dayjs";

function mainMenu(ctx, res) {
  const timeFormat = "DD MMMM YYYY hh:mm A";

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
    ).format(timeFormat)}</code>\n<strong>Last login:</strong> <code>${dayjs(
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
}

export default mainMenu;
