import { DataTypes, Model } from "sequelize";

import database from "../config/database.js";
import Leave from "./leave.js";
import Role from "./role.js";

const Users = database.define("users", {
	id_user: {
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
	jobTitle: {
		type: DataTypes.STRING,
		unique: false,
		allowNull: false,
	},
	leave_solde: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	role_id: {
		type: DataTypes.INTEGER,
		references: {
			model: Role,
			key: "id_role",
		},
	},
});

import("./role.js").then(({ default: Role }) => {
	Users.belongsTo(Role, { foreignKey: "role_id" });
});

import("./leave.js").then(({ default: Leave }) => {
	Users.hasOne(Leave, {
		foreignKey: "id_user",
		onDelete: "CASCADE",
	});
});

export default Users;
