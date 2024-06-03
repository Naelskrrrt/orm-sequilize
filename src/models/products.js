import { DataTypes } from "sequelize";

import database from "../config/database.js";

const Product = database.define("product", {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "PPN",
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 10.0,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

export default Product;
