import AWS from "aws-sdk";
import multer from "multer";
import CustomProduct from "../../../models/CustomProduct";
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
			upload.fields([
				{ name: "image", maxCount: 1 },
				{ name: "gallery", maxCount: 10 },
			])(req, res, async (err) => {
				if (err) {
					console.error("Error uploading files:", err);
					return res
						.status(500)
						.json({ message: "Internal server error." });
				}

				// Access form data
				const {
					name,
					description,
					sku,
					price,
					brand,
					sale_price,
					type,
					quantity,
					category,
					tags,
					meta,
					colors,
					sizes,
					gender,
				} = req.body;

				const sizeArray = JSON.parse(sizes);
				const colorsArray = JSON.parse(colors);

				const metaArray = JSON.parse(req.body.meta);

				console.log("metaArray\n", metaArray);

				const imageFile = req.files["image"]
					? req.files["image"][0]
					: null;
				const galleryFiles = req.files["gallery"] || [];

				// Upload single image to S3
				const uploadSingleImage = async () => {
					if (!imageFile) return null;
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
						return data.Location;
					} catch (error) {
						console.error(
							"Error uploading single image to S3:",
							error
						);
						throw error;
					}
				};

				// Upload gallery images to S3
				const uploadGalleryImages = async () => {
					return Promise.all(
						galleryFiles.map(async (file) => {
							const params = {
								Bucket: process.env.NEXT_AWS_BUCKET_NAME,
								Key: `${Date.now().toString()}-${
									file.originalname
								}`,
								Body: file.buffer,
								ContentType: file.mimetype,
								ACL: "public-read",
							};

							try {
								const data = await s3.upload(params).promise();
								return data.Location;
							} catch (error) {
								console.error(
									"Error uploading gallery image to S3:",
									error
								);
								throw error;
							}
						})
					);
				};

				// Upload single image and gallery images concurrently
				const [imageUrl, galleryImageUrls] = await Promise.all([
					uploadSingleImage(),
					uploadGalleryImages(),
				]);

				console.log("Category :: ", typeof category);
				// Create a new Product document
				const product = new CustomProduct({
					name,
					description,
					sku,
					price,
					sale_price,
					quantity,
					type,
					brand,
					category: JSON.parse(category),
					tags: tags ? JSON.parse(tags) : [],
					colors: colorsArray || [],
					sizes: sizeArray || [],
					meta: meta ? JSON.parse(meta) : [],
					gender: gender ? JSON.parse(gender) : [],
					image: { original: imageUrl, thumbnail: imageUrl, id: 1 },
					gallery: galleryImageUrls.map((url, index) => ({
						original: url,
						thumbnail: url,
						id: index + 1,
					})),
				});

				console.log(product);

				await product.save();

				// Send response with image URLs
				res.status(200).json({
					success: true,
					message: "Custom Product Created Successfully.",
					product,
				});
			});
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
