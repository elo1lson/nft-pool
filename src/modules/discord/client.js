import { Client, GatewayIntentBits } from "discord.js";
import sendMail from "./commands/sendMail.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const avaliableCommand = ["send"];

client.on("ready", ready);
client.on("interactionCreate", interactionCreate);

async function ready(client) {
  console.log("logged");
}

async function interactionCreate(interaction) {
  try {
    let { commandName } = interaction;

    if (!interaction.isChatInputCommand()) return;
    if (!avaliableCommand.includes(commandName)) return;


    sendMail.run(interaction);
  } catch (e) {
    console.log(e);
  }
}

export default client;
