import Leave from "../models/leave.js";
import Users from "../models/users.js";
import LeaveType from "../models/leaveType.js";

// Create a new leave entry
export const createLeave = async (req, res) => {
	try {
		const leave = await Leave.create(req.body);
		res.status(201).json(leave);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all leave entries
export const getLeaves = async (req, res) => {
	try {
		const leaves = await Leave.findAll({
			include: [
				{
					model: Users,
					attributes: ["firstName", "lastName", "email"],
				},
				{ model: LeaveType, attributes: ["leave_type"] },
			],
		});
		res.status(200).json(leaves);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get a single leave entry by ID
export const getLeaveById = async (req, res) => {
	try {
		const leave = await Leave.findByPk(req.params.id, {
			include: [
				{
					model: Users,
					attributes: ["firstName", "lastName", "email"],
				},
				{ model: LeaveType, attributes: ["leave_type"] },
			],
		});
		if (!leave) {
			return res.status(404).json({ error: "Leave not found" });
		}
		res.status(200).json(leave);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Update a leave entry by ID
export const updateLeave = async (req, res) => {
	try {
		const leave = await Leave.findByPk(req.params.id);
		if (!leave) {
			return res.status(404).json({ error: "Leave not found" });
		}
		await leave.update(req.body);
		res.status(200).json(leave);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete a leave entry by ID
export const deleteLeave = async (req, res) => {
	try {
		const leave = await Leave.findByPk(req.params.id);
		if (!leave) {
			return res.status(404).json({ error: "Leave not found" });
		}
		await leave.destroy();
		res.status(204).json({ message: "Leave deleted" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// update status only on patch

export const updateLeaveStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		// Vérifier si le statut fourni est valide
		const validStatuses = ["pending", "approved", "rejected"];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({ error: "Invalid status" });
		}

		// Trouver le congé par ID
		const leave = await Leave.findByPk(id);
		if (!leave) {
			return res.status(404).json({ error: "Leave not found" });
		}

		// Mettre à jour le statut du congé
		leave.status = status;
		await leave.save();

		res.status(200).json(leave);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
