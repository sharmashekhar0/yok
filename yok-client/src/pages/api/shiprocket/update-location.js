import axios from "axios";
import connectToDatabase from "../../../lib/mongodb";
import generateShiprocketToken from "../../../lib/shiprocket-config";
import corsMiddleware from "../../../lib/cors";

// Establish a connection to the database
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
		if (req.method === "POST") {
			try {
				console.log("Request body:", req.body);
				const { orderId, address } = req.body;

				const data = {
					orderId,
					pickup_location: address,
				};

				if (!orderId || !address) {
					throw new Error(
						"Missing required fields in the request body"
					);
				}

				const token = await generateShiprocketToken();
				console.log("Shiprocket Token:", token);

				console.log("Data:", data);

				const response = await axios.post(
					"https://apiv2.shiprocket.in/v1/external/orders/address/pickup",
					data,
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
					shiprocketResponse: response.data,
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
