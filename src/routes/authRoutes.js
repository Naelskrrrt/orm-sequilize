import express from "express";
import bcrypt from "bcryptjs";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		const newUser = await Users.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await Users.findOne({ where: { email } });

	if (!user) return res.status(400).send("Email or password is wrong");

	const validPass = await bcrypt.compare(password, user.password);
	if (!validPass) return res.status(400).send("Invalid Password");

	const token = jwt.sign(
		{ id: user.id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);

	res.header("Authorization", token).json({ token: token });
});

export default router;
