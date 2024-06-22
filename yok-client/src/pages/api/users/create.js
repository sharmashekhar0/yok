import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

// Connect to the database
connectToDatabase();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(req, res) {
	const SECRET_KEY = process.env.NEXT_SECRET_KEY;

	if (req.method === "POST") {
		try {
			const { name, email, password, googleToken } = req.body;

			if (googleToken) {
				// Google Sign-Up
				const ticket = await client.verifyIdToken({
					idToken: googleToken,
					audience: process.env.GOOGLE_CLIENT_ID,
				});

				const payload = ticket.getPayload();
				const { sub: googleId, email, name } = payload;

				// Check if the user already exists
				let user = await User.findOne({ email });

				if (!user) {
					// Create a new user instance
					user = new User({
						name,
						email,
						googleId,
					});

					await user.save();
				}

				const token = jwt.sign(
					{ userId: user._id, email: user.email },
					SECRET_KEY,
					{ expiresIn: "5d" }
				);

				res.status(201).json({
					message: "User authenticated successfully",
					user,
					token,
				});
			} else {
				// Regular Sign-Up
				if (!name || !email || !password) {
					return res
						.status(400)
						.json({ error: "Missing required fields" });
				}

				// Check if the user already exists
				let user = await User.findOne({ email });

				if (user) {
					return res
						.status(400)
						.json({ error: "Email address already in use" });
				}

				// Hash the password
				const hashedPassword = await bcrypt.hash(password, 10);

				// Create a new user instance
				const newUser = new User({
					name,
					email,
					password: hashedPassword,
				});

				await newUser.save();

				const token = jwt.sign(
					{ userId: newUser._id, email: newUser.email },
					SECRET_KEY,
					{ expiresIn: "5d" }
				);

				res.status(201).json({
					message: "User created successfully",
					user: newUser,
					token,
				});
			}
		} catch (error) {
			if (error.name === "MongoServerError" && error.code === 11000) {
				// Duplicate key error (email already exists)
				res.status(400).json({ error: "Email address already in use" });
			} else {
				console.error("Error creating user:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
