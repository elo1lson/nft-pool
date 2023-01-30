import express from "express";
import run from "./src/modules/extract.js";
import dotenv from "dotenv";
import client from "./src/modules/discord/client.js";
import { Data } from "./src/modules/email.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.get("/send", (req, res) => {
  res.sendFile("./documents/data.csv", { root: "./" });
});

app.listen(port, () => {
  console.log("server is running");

  client.login(process.env.DISCORD_TOKEN);

  setInterval(() => {
    let now = new Date();
    let currentHour = now.getUTCHours();

    if (currentHour > 21 && currentHour < 23) {
      run();
    }
  }, 1000 * 60 * 60);

  setInterval(() => {
    let now = new Date();
    let currentHour = now.getUTCHours();

    if (currentHour == 20) {
      Data.sendEmail(process.env.DEFAULT_EMAIL);
    }
  }, 1000 * 60 * 60);
});
