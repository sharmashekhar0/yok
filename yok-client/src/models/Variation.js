import mongoose from "mongoose";

let Variation;

try {
	Variation = mongoose.model("Variation");
} catch {
	const variationSchema = new mongoose.Schema(
		{
			size: { type: String, required: true },
		},
		{ timestamps: true }
	);

	Variation = mongoose.model("Variation", variationSchema);
}

export default Variation;
