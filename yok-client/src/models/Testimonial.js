import mongoose from "mongoose";

let Testimonial;

try {
	Testimonial = mongoose.model("Testimonial");
} catch {
	const testimonialSchema = new mongoose.Schema(
		{
			name: { type: String, required: true },
			avatar: { type: String, required: true },
			city: { type: String, required: true },
			rating: { type: String, required: true },
			content: { type: String, required: true },
		},
		{ timestamps: true }
	);

	Testimonial = mongoose.model("Testimonial", testimonialSchema);
}

export default Testimonial;
