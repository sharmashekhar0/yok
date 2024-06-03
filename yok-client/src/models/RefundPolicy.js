// server/models/PrivacyPolicy.js
const mongoose = require("mongoose");

let RefundPolicy;

try {
	RefundPolicy = mongoose.model("RefundPolicy");
} catch (error) {
	const refundPolicySchema = new mongoose.Schema(
		{
			content: {
				type: String,
				required: true,
			},
			bannerImage: {
				type: String, // Assuming the image is stored as a URL or file path
				required: false, // Adjust as needed
				default: null,
			},
			bannerHeading: {
				type: String,
				required: false, // Adjust as needed
				default: null,
			},
		},
		{ timestamps: true }
	);

	RefundPolicy = mongoose.model("RefundPolicy", refundPolicySchema);
}

module.exports = RefundPolicy;
