import * as EmailValidator from "email-validator";
import { SlashCommandBuilder } from "discord.js";
import { Data } from "../../email.js";

export default class sendMail {
  static data() {
    return new SlashCommandBuilder()
      .setName("send")
      .setDescription("Send a NFT's resume in you email")
      .addStringOption((o) =>
        o.setName("email").setDescription("your e-mail adress")
      );
  }

  static async run(int) {
    await int.deferReply({ ephemeral: true });
    let email = int.options.getString("email");

    if (!email) {
      Data.sendEmail(process.env.DEFAULT_EMAIL);
    }
    let isEmail = EmailValidator.validate(email);

    switch (isEmail) {
      case true:
        let description = `Download the data, this email was sent from discord, by the user ${int.user.username}#${int.user.discriminator}`;

        Data.sendEmail(email, description)
          .then((r) => int.editReply({ content: r }))
          .catch((e) => int.editReply({ content: e }));
        break;

      default:
        int.editReply({ content: "tour email is invalid", ephemeral: true });
        break;
    }
  }
}
