import express from "express";
import bcrypt from "bcryptjs";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import {
	deleteById,
	getAll,
	getById,
	login,
	register,
	update,
} from "../controllers/authControllers.js";
import { validateUser } from "../middlewares/validateEntity.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.post("/register", validateUser, register);

router.post("/login", authorize("admin"), login);

router.get("/", getAll);

router.get("/:id", authorize("admin"), getById);

router.put("/:id", authorize("admin"), validateUser, update);

router.delete("/:id", authorize("admin"), deleteById);

export default router;
