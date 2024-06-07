import { Router } from "express";
import {
	createLeave,
	deleteLeave,
	getLeaveById,
	getLeaves,
	updateLeave,
	updateLeaveStatus,
} from "../controllers/leaveControllers.js";
import { validateLeave } from "../middlewares/validateEntity.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

// Create New leave
router.post("/", validateLeave, createLeave);

// Get all leave Entries
router.get("/", authorize("admin"), getLeaves);

// Get one leave by id
router.get("/:id", getLeaveById);

// Update one leave by id
router.put("/:id", validateLeave, updateLeave);

// Update only a leave's status by id
router.patch("/:id/status", authorize("admin"), updateLeaveStatus);

// delete one leave by id
router.delete("/:id", deleteLeave);

export default router;
