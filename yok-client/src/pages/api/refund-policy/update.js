// pages/api/privacy-policy.js
import connectToDatabase from "../../../lib/mongodb";
import RefundPolicy from "../../../models/RefundPolicy";
import corsMiddleware from "../../../lib/cors";

connectToDatabase();

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "POST") {
			try {
				const { content, bannerImage, bannerHeading } = req.body;

				// Validate content field
				if (!content || typeof content !== "string") {
					return res.status(400).json({
						error: "Invalid content. Content must be a non-empty string.",
					});
				}

				// Save the new privacy policy content
				const newRefundPolicy = new RefundPolicy({
					content,
					bannerImage,
					bannerHeading,
				});
				await newRefundPolicy.save();

				res.status(201).json({
					message: "Refund policy updated successfully",
					RefundPolicy: newRefundPolicy,
				});
			} catch (error) {
				console.error("Error saving refund policy ::", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
