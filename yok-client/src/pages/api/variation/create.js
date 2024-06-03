// pages/api/variation.js
import connectToDatabase from "../../../lib/mongodb";
import Variation from "../../../models/Variation";
import corsMiddleware from "../../../lib/cors";

connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "POST") {
			try {
				const { size } = req.body;

				if (!size) {
					return res.status(400).json({ error: "Size is required" });
				}

				const newVariation = new Variation({
					size,
				});

				const newVariationResponse = await newVariation.save();

				res.status(201).json({
					message: "Variation data saved successfully",
					variation: newVariationResponse,
				});
			} catch (error) {
				console.error("Error saving variation data:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
