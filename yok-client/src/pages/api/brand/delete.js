import corsMiddleware from "../../../lib/cors";
import connectToDatabase from "../../../lib/mongodb";
import Brand from "../../../models/Brand";

// Connect to the database
connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "POST") {
			try {
				const { brandId } = req.body;

				if (!brandId) {
					return res.status(400).json({ error: "Missing brand" });
				}

				const deletedBrand = await Brand.findByIdAndDelete(brandId);

				if (!deletedBrand) {
					return res.status(404).json({ error: "Brand not found" });
				}

				res.status(200).json({
					message: "Brand deleted successfully",
					deletedBrand,
				});
			} catch (error) {
				console.error("Error deleting testimonial:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
