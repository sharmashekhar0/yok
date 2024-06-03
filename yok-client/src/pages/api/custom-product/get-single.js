import connectToDatabase from "../../../lib/mongodb";
import CustomProduct from "../../../models/CustomProduct";

connectToDatabase();

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { slug } = req.body;
		console.log("Slug", slug);
		try {
			// Find the product in the database by ID
			const product = await CustomProduct.findById(slug);

			if (!product) {
				// If product with the given ID is not found, return 404 Not Found
				return res
					.status(404)
					.json({ error: "Custom Product not found" });
			}

			// Return the product
			res.status(200).json(product);
		} catch (error) {
			console.error("Error fetching custom product:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		// Handle unsupported HTTP methods
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
