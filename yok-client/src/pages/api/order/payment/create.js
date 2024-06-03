import Order from "../../../../models/Order";
import connectToDatabase from "../../../../lib/mongodb";
import { getRazorpayInstance } from "../../../../lib/razorPay-config";

connectToDatabase();

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const {
				paymentMethod,
				paymentStatus,
				products,
				shippingAddress,
				status,
				totalPrice,
				tracking_number,
				transactionId,
				user,
			} = req.body;

			if (paymentMethod !== "cod") {
				const razorPay = await getRazorpayInstance();
				const options = {
					amount: totalPrice * 100,
					currency: "INR",
				};
				const order = await razorPay.orders.create(options);
				res.status(200).json({
					success: true,
					order,
				});
			} else {
				res.status(200).json({
					success: true,
				});
			}
		} catch (error) {
			console.error("Error creating order:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
