import { DataTypes } from "sequelize";
import database from "../config/database.js";

const LeaveType = database.define("leave_type", {
    id_leave_type: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    leave_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    default_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
    },
});

import("./leave.js").then(({ default: Leave }) => {
    LeaveType.hasOne(Leave, {
        foreignKey: "id_leave_type",
    });
});

export default LeaveType;
