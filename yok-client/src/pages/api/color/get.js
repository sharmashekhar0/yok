// pages/api/colors.js
import connectToDatabase from "../../../lib/mongodb";
import Color from "../../../models/Color";
import corsMiddleware from "../../../lib/cors";

connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "GET") {
			try {
				// Retrieve all color data from the database
				const colors = await Color.find({});
				res.status(200).json({
					message: "Colors fetched successfully",
					colors: colors,
				});
			} catch (error) {
				console.error("Error retrieving color data:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
