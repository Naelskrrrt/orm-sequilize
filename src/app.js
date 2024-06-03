import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import database from "./config/database.js";
import authenticateToken from "./middlewares/authenticateToken.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));

app.use("/auth", authRoutes);
app.use("/product", authenticateToken, productRoutes);

database
	.sync()
	.then((data) => console.log("connected !"))
	.catch((err) => console.log("error from db connection: ", err));

export default app;
