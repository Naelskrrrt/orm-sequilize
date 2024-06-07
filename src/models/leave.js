import { DataTypes } from "sequelize";

import database from "../config/database.js";
import LeaveType from "./leaveType.js";
import Users from "./users.js";

const Leave = database.define("leave", {
	id_leave: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	id_user: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	id_leave_type: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	end_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM(["pending", "approved", "rejected"]),
		allowNull: false,
		defaultValue: "pending",
	},
	commentary: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "Pas de Commentaires...",
	},
});

import("./users.js").then(({ default: Users }) => {
	Leave.belongsTo(Users, {
		foreignKey: "id_user",
	});
});

import("./leaveType.js").then(({ default: LeaveType }) => {
	Leave.belongsTo(LeaveType, {
		foreignKey: "id_leave_type",
	});
});

export default Leave;
