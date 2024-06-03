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
				const {
					order_id,
					order_date,
					billing_customer_name,
					billing_last_name,
					billing_address,
					billing_city,
					billing_pincode,
					billing_email,
					billing_state,
					billing_phone,
					order_items,
					payment_method,
					sub_total,
				} = req.body;

				if (
					!order_id ||
					!order_date ||
					!billing_customer_name ||
					!billing_last_name ||
					!billing_address ||
					!billing_city ||
					!billing_pincode ||
					!billing_email ||
					!billing_state ||
					!billing_phone ||
					!order_items ||
					!payment_method ||
					!sub_total
				) {
					throw new Error(
						"Missing required fields in the request body"
					);
				}

				console.log(order_items);

				const token = await generateShiprocketToken();
				console.log("Shiprocket Token:", token);

				const orderData = {
					order_id,
					order_date,
					pickup_location: "Primary",
					channel_id: "",
					billing_customer_name,
					billing_last_name,
					billing_address,
					billing_city,
					billing_pincode,
					billing_state: "Delhi", //important
					billing_country: "India", //important
					billing_email,
					billing_state,
					billing_phone,
					shipping_is_billing: true,
					shipping_customer_name: "",
					shipping_last_name: "",
					shipping_address: "",
					shipping_address_2: "",
					shipping_city: "",
					shipping_pincode: "",
					shipping_country: "",
					shipping_state: "",
					shipping_email: "",
					shipping_phone: "",
					order_items,
					payment_method: "Prepaid",
					shipping_charges: 0,
					giftwrap_charges: 0,
					transaction_charges: 0,
					total_discount: 0,
					sub_total: 9000,
					length: 10,
					breadth: 15,
					height: 20,
					weight: 2.5,
				};

				console.log("Order Data:", orderData);

				const response = await axios.post(
					"https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
					orderData,
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
