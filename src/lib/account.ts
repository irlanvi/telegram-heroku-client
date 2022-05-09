import { Markup } from "telegraf";

async function account(tgHerokuClient) {
  tgHerokuClient.action("account", async (ctx) => {
    ctx.editMessageText("Choose an option from the list below:", {
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback("Change Account Name", "changeAccountName")],
        [Markup.button.callback("Delete Account", "deleteAccount")],
        [Markup.button.callback("Back", "backToMainMenu")],
      ]).reply_markup,
    });
  });
}

export default account;
