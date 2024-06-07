import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Role = database.define("role", {
	id_role: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

export default Role;
