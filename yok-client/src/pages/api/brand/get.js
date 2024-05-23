import connectToDatabase from "../../../lib/mongodb";
import Brand from "../../../models/Brand";

connectToDatabase();

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const data = await Brand.find();
			res.status(200).json({ brands: data });
		} catch (error) {
			console.error("Error fetching brands ::", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
