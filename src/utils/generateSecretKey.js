import crypto from "crypto";

const generateSecretKey = (length = 64) => {
	return crypto.randomBytes(length).toString("hex");
};

console.log(generateSecretKey());
