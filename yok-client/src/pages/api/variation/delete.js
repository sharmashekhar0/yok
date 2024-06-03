// pages/api/variation/delete.js
import connectToDatabase from "../../../lib/mongodb";
import Variation from "../../../models/Variation";
import corsMiddleware from "../../../lib/cors";

connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "POST") {
			try {
				const { id } = req.body;

				if (!id) {
					return res.status(400).json({ error: "ID is required" });
				}

				const deletedVariation = await Variation.findByIdAndDelete(id);

				if (!deletedVariation) {
					return res
						.status(404)
						.json({ error: "Variation not found" });
				}

				res.status(200).json({
					message: "Variation deleted successfully",
				});
			} catch (error) {
				console.error("Error deleting variation:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
