import connectToDatabase from "../../../lib/mongodb";
import Color from "../../../models/Color";
import corsMiddleware from "../../../lib/cors";

connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "POST") {
			try {
				const { name, hexcode } = req.body;
				if (!name || !hexcode) {
					return res
						.status(400)
						.json({ error: "Name and hexcode are required" });
				}

				const newColor = new Color({
					name,
					hexcode,
				});

				const newColorResponse = await newColor.save();

				res.status(201).json({
					message: "Color data saved successfully",
					color: newColorResponse,
				});
			} catch (error) {
				console.error("Error saving color data:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
