import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const urls = JSON.parse(fs.readFileSync(path.resolve("data", "urls.json"), "utf-8"));
const apiUrl = urls.apiUrl;

dotenv.config();

const bot = new Telegraf(process.env.token);

bot.start((msg) => msg.reply("Привіт, Я можу надати актуальний курс валют"));
bot.help((msg) => msg.reply("/ex це команда повертає курс валют"));

bot.command("ex", async (msg) => {
  const text = msg.message.text;
  const [_, sum, from, to] = text.split(" ");
  
  const response = await fetch(`${apiUrl}v6/${process.env.apikey}/latest/${from}`);
  const data = await response.json();
  
  msg.reply(sum * data.conversion_rates[to]);
});

bot.launch(() => console.log("Bot started"));

