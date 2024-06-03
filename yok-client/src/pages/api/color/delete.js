import connectToDatabase from "../../../lib/mongodb";
import Color from "../../../models/Color";
import corsMiddleware from "../../../lib/cors";

connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "POST") {
			try {
				const { id } = req.body;
				console.log("Id ", id);

				if (!id) {
					return res.status(400).json({ error: "ID is required" });
				}

				const deletedColor = await Color.findByIdAndDelete(id);

				if (!deletedColor) {
					return res.status(404).json({ error: "Color not found" });
				}

				res.status(200).json({
					message: "Color deleted successfully",
				});
			} catch (error) {
				console.error("Error deleting color:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
