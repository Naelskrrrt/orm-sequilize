import bcrypt from "bcryptjs";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import Role from "../models/role.js";

// Fonction pour generer des fakers pour l'utilisateur

// Fonction pour obtenir un utilisateur par son ID

export const getById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await Users.findByPk(id, {
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});
		if (!user) return res.status(404).send("User not found");
		res.status(200).json(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
};
// Fonction pour obtenir tous les utilisateurs

export const getAll = async (req, res) => {
	try {
		const users = await Users.findAll({
			attributes: {
				exclude: ["password", "createdAt", "updatedAt"],
			},
			include: [{ model: Role, attributes: ["name"] }],
		});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

// Fonction pour enregistrer un nouvel utilisateur

export const register = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		leave_solde,
		jobTitle,
		password,
		role_id,
	} = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		const newUser = await Users.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			leave_solde,
			jobTitle,
			role_id,
		});
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

// Fonction pour connecter un utilisateur

export const login = async (req, res) => {
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
};

// Fonction pour mettre à jour un utilisateur

export const update = async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	try {
		const user = await Users.findByPk(id);
		if (!user) return res.status(404).send("User not found");
		await user.update(body);
		res.status(200).send("User updated successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
};

// Fonction pour supprimer un utilisateur par son ID
export const deleteById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await Users.findByPk(id);
		if (!user) return res.status(404).send("User not found");
		await user.destroy();
		res.status(200).send("User deleted successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
};
