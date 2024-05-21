import corsMiddleware from "../../../lib/cors";
import connectToDatabase from "../../../lib/mongodb";
import Testimonial from "../../../models/Testimonial";

// Connect to the database
connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "POST") {
			try {
				const { testimonialId } = req.body;

				if (!testimonialId) {
					return res
						.status(400)
						.json({ error: "Missing testimonial" });
				}

				const deletedTestimonial = await Testimonial.findByIdAndDelete(
					testimonialId
				);

				if (!deletedTestimonial) {
					return res
						.status(404)
						.json({ error: "Testimonial not found" });
				}

				res.status(200).json({
					message: "Testimonial deleted successfully",
					deletedTestimonial,
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
