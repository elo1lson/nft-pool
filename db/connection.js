const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  timezone: process.env.DATABASE_TIMEZONE,
});
module.exports = sequelize;
