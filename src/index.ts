import { Telegraf } from "telegraf";
import "dotenv/config";
import start from "./cmd/start";
import account from "./lib/account";
import backToMainMenu from "./lib/backToMainMenu";

const tgHerokuClient = new Telegraf(process.env.BOT_TOKEN);

await start(tgHerokuClient);
await account(tgHerokuClient);
await backToMainMenu(tgHerokuClient);

tgHerokuClient.launch();

process.once("SIGINT", () => tgHerokuClient.stop("SIGINT"));
process.once("SIGTERM", () => tgHerokuClient.stop("SIGTERM"));
