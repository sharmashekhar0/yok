import AWS from "aws-sdk";
import multer from "multer";
import CustomProductRequest from "../../../models/CustomProductRequest";
import s3 from "../../../lib/aws-config";

// Configure multer to handle file uploads
const upload = multer();

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			// Use multer middleware to handle file uploads
			upload.fields([{ name: "image", maxCount: 1 }])(
				req,
				res,
				async (err) => {
					if (err) {
						console.error("Error uploading files:", err);
						return res
							.status(500)
							.json({ message: "Internal server error." });
					}

					// Access form data
					const {
						name,
						productName,
						color,
						side,
						customizationType,
						customizePolos,
						customizeBasics,
						userId,
					} = req.body;

					const sideValue = side || "front";
					const customizationTypeValue = customizationType || "";
					const customizePolosValue = customizePolos || "";
					const customizeBasicsValue = customizeBasics || "";

					if (!userId) {
						return res
							.status(400)
							.json({ message: "Please provide user id" });
					}

					const imageFile = req.files["image"]
						? req.files["image"][0]
						: null;

					// Check if both name and image are provided
					if (name && imageFile) {
						console.error(
							"Both name and imageUrl cannot be provided simultaneously."
						);
						return res.status(400).json({
							message:
								"Both name and imageUrl cannot be provided simultaneously.",
						});
					}

					console.log("Image File :: ", imageFile);
					let imageUrlToSave = null;

					// Upload image to S3 if provided
					if (imageFile) {
						const params = {
							Bucket: process.env.NEXT_AWS_BUCKET_NAME,
							Key: `${Date.now().toString()}-${
								imageFile.originalname
							}`,
							Body: imageFile.buffer,
							ContentType: imageFile.mimetype,
							ACL: "public-read",
						};

						try {
							const data = await s3.upload(params).promise();
							console.log("Data :: ", data);
							imageUrlToSave = data.Location;
						} catch (error) {
							console.error(
								"Error uploading image to S3:",
								error
							);
							return res.status(500).json({
								message: "Error uploading image to S3.",
							});
						}
					}

					console.log("Image Url :: ", imageUrlToSave);
					console.log(productName);
					// Create a new CustomProduct document
					const customProduct = new CustomProductRequest({
						userId,
						productName,
						name: name ? name : null,
						imageUrl: imageUrlToSave,
						color: color ? color : "",
						side: sideValue,
						customizationType: customizationTypeValue,
						customizePolos: customizePolosValue,
						customizeBasics: customizeBasicsValue,
					});

					console.log("Custom Product :: ", customProduct);

					// Save the customProduct to the database
					try {
						await customProduct.save();
					} catch (error) {
						console.error(
							"Error saving custom product to the database:",
							error
						);
						return res.status(500).json({
							message:
								"Error saving custom product to the database.",
						});
					}

					// Send response with product details
					res.status(200).json({
						success: true,
						message: "Custom Product Created Successfully.",
						customProduct,
					});
				}
			);
		} catch (error) {
			console.error("Error processing form data:", error);
			res.status(500).json({ message: "Internal server error." });
		}
	} else {
		res.status(405).json({ message: "Method not allowed." });
	}
}
