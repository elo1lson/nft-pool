import { appendFileSync, readFile } from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

class Data {
  constructor(data) {
    this.data = data;
  }

  static async sendEmail(email, description = "Please download the data") {
    let user = process.env.EMAIL;
    let pass = process.env.PASS;
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      service: "hotmail",
      port: 587,
      auth: {
        user,
        pass,
      },
    });

    return transporter
      .sendMail({
        to: email,
        from: user,
        subject: "Your nft data has arrived!",
        text: description,
        attachments: [
          {
            filename: "NFT's resume.csv",
            path: `http://localhost:${process.env.PORT}${process.env.DOCUMENT_PATH}`,
          },
        ],
      })
      .then((m) => "Email successfully sent")
      .catch((e) => "email not sent, try again");
  }

  saveAsCSV() {
    try {
      this.data.forEach((e) => {
        let _ = "";
        for (const i in e) {
          if (i == "createdAt") {
            let oldTime = e[i];
            let newTime = new Date(oldTime).toLocaleString();

            _ += newTime + ";";

            continue;
          }

          _ += e[i] + ";";
        }

        appendFileSync("./documents/data.csv", _ + "\n");
      });
    } catch (err) {
      console.error(err);
    }
  }
}

const _Data = Data;
export { _Data as Data };
