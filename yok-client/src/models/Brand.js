const mongoose = require("mongoose");

let Brand;

try {
	Brand = mongoose.model("Brand");
} catch (error) {
	const brandSchema = new mongoose.Schema(
		{
			name: { type: String, required: true },
			icon: {
				type: String,
				required: true,
			},
		},
		{ timestamps: true }
	);
	Brand = mongoose.model("Brand", brandSchema);
}
module.exports = Brand;
