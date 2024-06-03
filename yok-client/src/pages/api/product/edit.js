import AWS from "aws-sdk";
import multer from "multer";
import Product from "../../../models/Products";
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
					productId,
					name,
					description,
					sku,
					price,
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

				console.log(productId);
				const sizeArray = JSON.parse(sizes);
				const colorsArray = JSON.parse(colors);
				const metaArray = JSON.parse(meta);

				const imageFile = req.files["image"]
					? req.files["image"][0]
					: null;
				const galleryFiles = req.files["gallery"] || [];

				// Upload single image to S3
				const uploadSingleImage = async () => {
					if (!imageFile) return null;
					if (
						imageFile.startsWith("http://") ||
						imageFile.startsWith("https://")
					) {
						return imageFile;
					}
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
					if (!galleryFiles) return galleryFiles;
					return Promise.all(
						galleryFiles.map(async (file) => {
							if (
								file.startsWith("http://") ||
								file.startsWith("https://")
							) {
								return file; // If file is a URL, return it directly
							}
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

				console.log(productId);

				const product = await Product.findById(productId);

				if (!product) {
					return res.status(404).json({
						success: false,
						message: "Product not found.",
					});
				}

				product.name = name;
				product.description = description;
				product.sku = sku;
				product.price = price;
				product.sale_price = sale_price;
				product.type = type;
				product.quantity = quantity;
				product.category = JSON.parse(category);
				product.tags = tags ? JSON.parse(tags) : [];
				product.colors = colors ? colorsArray : [];
				product.sizes = sizes ? sizeArray : [];
				product.meta = meta ? JSON.parse(meta) : [];
				product.gender = gender ? JSON.parse(gender) : [];
				product.image = {
					original: imageUrl,
					thumbnail: imageUrl,
					id: 1,
				};
				product.gallery = galleryImageUrls.map((url, index) => ({
					original: url,
					thumbnail: url,
					id: index + 1,
				}));

				await product.save();

				res.status(200).json({
					success: true,
					message: "Product updated successfully.",
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
