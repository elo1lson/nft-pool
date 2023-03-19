"use strict";

const dotenv = require("dotenv");
const cron = require("cron");

const goToData = require("./src/modules/extract.js");
const sequelize = require("./db/connection.js");
const Nft = require("./src/models/Nft.js");

dotenv.config();

const getConnection = (sequelize) => {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        resolve(sequelize);
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
        reject(sequelize);
      });
  });
};

getConnection(sequelize).then(async () => {
  //await sequelize.sync();
  //await sequelize.sync({ force: true });

  const task = async () => {
    const data = await goToData();
    data.map(async (item) => {
      await Nft.create(item)
        .then((r) => r)
        .catch((e) => {
          process.exit(1);
        });
    });
  };

  new cron.CronJob("0 0 19 * * *", task, null, true, "America/Sao_Paulo");
});
