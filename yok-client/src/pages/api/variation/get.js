// pages/api/variation/index.js
import connectToDatabase from "../../../lib/mongodb";
import Variation from "../../../models/Variation";
import corsMiddleware from "../../../lib/cors";

connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "GET") {
			try {
				// Retrieve all variation data from the database
				const variations = await Variation.find({});
				res.status(200).json({
					message: "Variation deleted successfully",
					variations: variations,
				});
			} catch (error) {
				console.error("Error retrieving variation data:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
