import { Router } from "express";
import {
	createLeaveType,
	getLeaveTypes,
	getLeaveTypeById,
	updateLeaveType,
	deleteLeaveType,
} from "../controllers/leaveTypeControllers.js";

const router = Router();

// Create a new leave type entry
router.post("/", createLeaveType);

// Get all leave type entries
router.get("/", getLeaveTypes);

// Get a single leave type entry by ID
router.get("/:id", getLeaveTypeById);

// Update a leave type entry by ID
router.put("/:id", updateLeaveType);

// Delete a leave type entry by ID
router.delete("/:id", deleteLeaveType);

export default router;
