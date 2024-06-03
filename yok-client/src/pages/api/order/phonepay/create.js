import axios from "axios";
import Order from "../../../../models/Order";
import connectToDatabase from "../../../../lib/mongodb";
const crypto = require("crypto");

connectToDatabase();

const generateID = () => {
	const timestamp = Date.now();
	const randomNum = Math.floor(Math.random() * 100000);
	const MPrefix = "M";
	const transactionID = `${MPrefix}${timestamp}${randomNum}`;
	console.log(transactionID);
	return transactionID;
};

// Function to sanitize input
const sanitizeInput = (input) => {
	return input.replace(/[\u{1F600}-\u{1F64F}]/gu, ""); // Remove emojis
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { totalPrice, firstName } = req.body;
			const sanitizedFirstName = sanitizeInput(firstName); // Sanitize first name

			console.log(totalPrice, sanitizedFirstName);

			// Call the PhonePe API to initiate payment
			const phonePeResponse = await initiatePhonePePayment(
				sanitizedFirstName,
				totalPrice
			);

			// Example: Save the order in your database
			const order = new Order({
				totalPrice: totalPrice,
				user: user._id,
				paymentStatus: "pending", // or whatever status you want to set initially
				// Other order details if needed
			});
			await order.save();

			// Send success response to the client
			res.status(200).json({
				message: "Payment initiated successfully",
				res: phonePeResponse,
			});
		} catch (error) {
			console.error("Error creating payment:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}

// Function to make a request to PhonePe API
async function initiatePhonePePayment(username, amount) {
	try {
		// Construct the payload
		const payload = {
			merchantId: "PGTESTPAYUAT",
			merchantTransactionId: generateID(),
			merchantUserId: "MUID123",
			amount: amount * 100,
			name: username,
			redirectUrl: "http://localhost:3000/api/order/phonepay/verify",
			redirectMode: "POST",
			callbackUrl: "http://localhost:3000/api/order/phonepay/verify",
			mobileNumber: "9999999999",
			paymentInstrument: {
				type: "PAY_PAGE",
			},
		};

		// Convert payload to Base64 encoded string
		const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
			"base64"
		);

		// Calculate X-VERIFY header
		const saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
		const saltIndex = 1;
		const string = base64Payload + "/pg/v1/pay" + saltKey;
		const sha256 = crypto.createHash("sha256").update(string).digest("hex");
		const checksum = sha256 + "###" + saltIndex;

		console.log(checksum);

		const response = await axios.post(
			"https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay",
			{
				request: base64Payload,
			},
			{
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					"X-VERIFY": checksum,
				},
			}
		);

		// Log the response for debugging
		console.log("PhonePe API response:", response.data);

		// Return the response from PhonePe API
		return response.data;
	} catch (error) {
		console.error(
			"Error initiating PhonePe payment:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
}
