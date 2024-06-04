import { Router } from "express";
import {
	getAll,
	createOne,
	deleteOne,
	getOne,
	updateOne,
} from "../controllers/productControllers.js";

const router = Router();

router.get("/", getAll);
router.post("/", createOne);
router.get("/:id", getOne);
router.put("/:id", updateOne);
router.delete("/:id", deleteOne);

export default router;
