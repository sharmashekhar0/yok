import mongoose from "mongoose";

let Color;

try {
	Color = mongoose.model("Color");
} catch {
	const colorSchema = new mongoose.Schema(
		{
			name: { type: String, required: true },
			hexcode: { type: String, required: true },
		},
		{ timestamps: true }
	);

	Color = mongoose.model("Color", colorSchema);
}

export default Color;
