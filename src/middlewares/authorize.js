export const authorize = (roles = []) => {
	if (typeof roles === "string") {
		roles = [roles];
	}

	return [
		(req, res, next) => {
			if (!req.user || !roles.includes(req.user.role.name)) {
				return res.status(403).json({ message: "Forbidden" });
			}
			next();
		},
	];
};
