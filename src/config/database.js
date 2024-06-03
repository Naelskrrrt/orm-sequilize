import { Sequelize } from "sequelize";
import "dotenv/config";
const DB_NAME = process.env.DB_NAME;
const USER_NAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DIALECT = process.env.DB_DIALECT;
const HOST = process.env.DB_HOST;

export default new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
	dialect: DIALECT,
	host: HOST,
});
