const mongoose = require("mongoose");

let CustomProductRequest;

try {
	CustomProductRequest = mongoose.model("CustomProductRequest");
} catch (error) {
	const CustomProductRequestSchema = new mongoose.Schema(
		{
			userId: { type: mongoose.Schema.Types.ObjectId, required: true },
			productName: { type: String, required: true },
			name: { type: String },
			imageUrl: { type: String },
			color: { type: String },
			size: { type: String },
			side: { type: String },
			quantity: { type: Number },
			customizationType: { type: String },
			customizePolos: { type: String },
			customizeBasics: { type: String },
		},
		{ timestamps: true }
	);

	CustomProductRequest = mongoose.model(
		"CustomProductRequest",
		CustomProductRequestSchema
	);
}

module.exports = CustomProductRequest;
