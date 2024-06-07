import LeaveType from "../models/leaveType.js";

// Create a new leave type entry
export const createLeaveType = async (req, res) => {
	try {
		const leaveType = await LeaveType.create(req.body);
		res.status(201).json(leaveType);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all leave type entries
export const getLeaveTypes = async (req, res) => {
	try {
		const leaveTypes = await LeaveType.findAll();
		res.status(200).json(leaveTypes);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get a single leave type entry by ID
export const getLeaveTypeById = async (req, res) => {
	try {
		const leaveType = await LeaveType.findByPk(req.params.id);
		if (!leaveType) {
			return res.status(404).json({ error: "Leave type not found" });
		}
		res.status(200).json(leaveType);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Update a leave type entry by ID
export const updateLeaveType = async (req, res) => {
	try {
		const leaveType = await LeaveType.findByPk(req.params.id);
		if (!leaveType) {
			return res.status(404).json({ error: "Leave type not found" });
		}
		await leaveType.update(req.body);
		res.status(200).json(leaveType);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete a leave type entry by ID
export const deleteLeaveType = async (req, res) => {
	try {
		const leaveType = await LeaveType.findByPk(req.params.id);
		if (!leaveType) {
			return res.status(404).json({ error: "Leave type not found" });
		}
		await leaveType.destroy();
		res.status(204).json({ message: "Leave type deleted" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
