const mongoose = require("mongoose");

let CustomProduct;

try {
	// delete mongoose.connection.models['CustomProduct'];
	CustomProduct = mongoose.model("CustomProduct");
} catch (error) {
	const CustomProductSchema = new mongoose.Schema(
		{
			userId: { type: mongoose.Schema.Types.ObjectId, required: true },
			name: { type: String },
			imageUrl: { type: String },
			color: { type: String },
			side: { type: String },
			customizationType: { type: String },
			customizePolos: { type: String },
			customizeBasics: { type: String },
		},
		{ timestamps: true }
	);

	CustomProduct = mongoose.model("CustomProduct", CustomProductSchema);
}

module.exports = CustomProduct;
