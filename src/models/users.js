import { DataTypes } from "sequelize";

import database from "../config/database.js";
import Leave from "./leave.js";

// type: DataTypes.INTEGER.UNSIGNED,
// 		primaryKey: true,
// 		autoIncrement: true,
// 		allowNull: false,

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
    service: {
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
});

import("./leave.js").then(({ default: Leave }) => {
    Users.hasOne(Leave, {
        foreignKey: "id_user",
        onDelete: "CASCADE",
    });
});

export default Users;
