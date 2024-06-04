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

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/", getAll);

router.get("/:id", getById);

router.put("/:id", update);

router.delete("/:id", deleteById);

export default router;
