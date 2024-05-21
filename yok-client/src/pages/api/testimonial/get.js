import connectToDatabase from "../../../lib/mongodb";
import Testimonial from "../../../models/Testimonial";

connectToDatabase();

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const isCustomizable = req.query.customizable === "true";
			const query = isCustomizable ? { customizable: true } : {};

			const testimonials = await Testimonial.find(query);

			res.status(200).json(testimonials);
		} catch (error) {
			console.error("Error fetching testimonial:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
