import { DataTypes } from "sequelize";

import database from "../config/database.js";

// type: DataTypes.INTEGER.UNSIGNED,
// 		primaryKey: true,
// 		autoIncrement: true,
// 		allowNull: false,

const Users = database.define("users", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Users;
