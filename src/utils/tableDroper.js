import database from "../config/database.js";
import Users from "../models/users.js";
import Leave from "../models/leave.js";
import LeaveType from "../models/leaveType.js";

const dropTables = async () => {
	try {
		await database.query("SET FOREIGN_KEY_CHECKS = 0;");

		await Leave.drop();
		await LeaveType.drop();
		await Users.drop();

		await database.query("SET FOREIGN_KEY_CHECKS = 1;");

		console.log("Tables dropped successfully");
	} catch (error) {
		console.error("Unable to drop tables:", error);
	}
};

dropTables();
