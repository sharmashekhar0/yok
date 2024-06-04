// server/models/PrivacyPolicy.js
const mongoose = require("mongoose");

let ShippingPolicy;

try {
	ShippingPolicy = mongoose.model("ShippingPolicy");
} catch (error) {
	const shippingPolicySchema = new mongoose.Schema(
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

	ShippingPolicy = mongoose.model("ShippingPolicy", shippingPolicySchema);
}

module.exports = ShippingPolicy;
