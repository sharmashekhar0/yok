import multer from "multer";
import Brand from "../../../models/Brand";
import s3 from "../../../lib/aws-config";

const upload = multer();

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			upload.fields([{ name: "icon", maxCount: 1 }])(
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
					const { name } = req.body;

					const imageFile = req.files["icon"]
						? req.files["icon"][0]
						: null;

					// Upload single image to S3
					const uploadSingleImage = async () => {
						if (!imageFile) return null;
						const params = {
							Bucket: process.env.NEXT_AWS_BUCKET_NAME,
							Key: `${Date.now().toString()}-${
								imageFile?.originalname
							}`,
							Body: imageFile?.buffer,
							ContentType: imageFile?.mimetype,
							ACL: "public-read",
						};

						try {
							const data = await s3.upload(params).promise();
							return data.Location;
						} catch (error) {
							console.error(
								"Error uploading single image to S3:",
								error
							);
							throw error;
						}
					};

					const [imageUrl] = await Promise.all([uploadSingleImage()]);

					const brand = new Brand({
						name,
						icon: imageUrl,
					});

					await brand.save();

					// Send response with image URLs
					res.status(200).json({
						success: true,
						message: "New Brand Created Successfully.",
						brand,
					});
				}
			);
		} catch (error) {
			if (error.name === "MongoTimeoutError") {
				console.error("MongoDB operation timed out:", error);
				res.status(500).json({
					message: "Database operation timed out.",
				});
			} else {
				console.error("Error processing form data:", error);
				res.status(500).json({ message: "Internal server error." });
			}
		}
	} else {
		res.status(405).json({ message: "Method not allowed." });
	}
}
