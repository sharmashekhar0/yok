import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cors from "micro-cors";
import corsMiddleware from "../../../lib/cors";
import { OAuth2Client } from "google-auth-library";

const cors = Cors();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

connectToDatabase();

export default async function handler(req, res) {
	console.log("called");
	await corsMiddleware(req, res, async () => {
		const SECRET_KEY = process.env.NEXT_SECRET_KEY;

		if (req.method === "POST") {
			try {
				const { email, password, googleToken } = req.body;

				if (googleToken) {
					// Google Login
					const ticket = await client.verifyIdToken({
						idToken: googleToken,
						audience: process.env.GOOGLE_CLIENT_ID,
					});

					const payload = ticket.getPayload();
					const { sub: googleId, email, name } = payload;

					// Find the user by email
					let user = await User.findOne({ email });

					if (!user) {
						// If the user does not exist, create a new user
						user = new User({
							name,
							email,
							googleId,
						});

						await user.save();
					}

					// Generate a JWT token
					const token = jwt.sign(
						{ userId: user._id, email: user.email },
						SECRET_KEY,
						{ expiresIn: "5d" }
					);

					res.status(200).json({
						message: "Login successful",
						user,
						token,
					});
				} else {
					// Regular Login
					// Check for required fields
					if (!email || !password) {
						return res
							.status(400)
							.json({ error: "Missing required fields" });
					}

					// Find the user by email
					const existingUser = await User.findOne({ email });

					// Check if the user exists
					if (!existingUser) {
						return res
							.status(401)
							.json({ error: "Invalid email or password" });
					}

					// Compare the password
					const passwordMatch = await bcrypt.compare(
						password,
						existingUser.password
					);

					if (!passwordMatch) {
						return res
							.status(401)
							.json({ error: "Invalid email or password" });
					}

					// Generate a JWT token
					const token = jwt.sign(
						{ userId: existingUser._id, email: existingUser.email },
						SECRET_KEY,
						{ expiresIn: "5d" }
					);

					res.status(200).json({
						message: "Login successful",
						user: existingUser,
						token,
					});
				}
			} catch (error) {
				console.error("Error during login:", error);
				res.status(500).json({ error: error.message });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
