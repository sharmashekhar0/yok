import axios from "axios";
import connectToDatabase from "../../../lib/mongodb";
import generateShiprocketToken from "../../../lib/shiprocket-config";
import corsMiddleware from "../../../lib/cors";

connectToDatabase().catch((error) => {
	console.error("Database connection error:", error);
});

export const config = {
	api: {
		bodyParser: true,
	},
};

export default async function handler(req, res) {
	await corsMiddleware(req, res, async () => {
		if (req.method === "GET") {
			try {
				const token = await generateShiprocketToken();
				console.log("Shiprocket Token:", token);

				const response = await axios.get(
					"https://apiv2.shiprocket.in/v1/external/orders",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				console.log("Response from Shiprocket:", response.data);

				res.status(200).json({
					success: true,
					allOrderStatus: response?.data,
				});
			} catch (error) {
				console.error("Error creating order:", error.message);
				res.status(500).json({
					error: "Internal Server Error",
					details: error.message,
				});
			}
		} else {
			res.status(405).json({ error: "Method Not Allowed" });
		}
	});
}
