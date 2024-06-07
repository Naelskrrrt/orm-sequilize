// Lib
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Config
import database from "./config/database.js";

// middlewares
import authenticateToken from "./middlewares/authenticateToken.js";

// Models
import Users from "./models/users.js";
import LeaveType from "./models/leaveType.js";
import Leave from "./models/leave.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import leaveTypeRoutes from "./routes/leaveTypeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));

app.use("/auth", authRoutes);
app.use("/products", authenticateToken, productRoutes);
app.use("/leave-types", authenticateToken, leaveTypeRoutes);
app.use("/leaves", authenticateToken, leaveRoutes);

async function createTables() {
	try {
		console.log("Connection has been established successfully.");

		// Créer d'abord la table `users`
		await Users.sync({ force: true }); // `force: true` est utilisé pour recréer la table si elle existe déjà

		// Ensuite, créer la table `leave_types`
		await LeaveType.sync({ force: true });

		// Enfin, créer la table `leaves`
		await Leave.sync({ force: true });

		console.log("All tables created successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

createTables();

database
	.sync()
	.then((data) => console.log("connected !"))
	.catch((err) => console.log("error from db connection: ", err));

export default app;
