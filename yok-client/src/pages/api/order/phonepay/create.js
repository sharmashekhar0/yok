import axios from "axios";
import Order from "../../../../models/Order";
import connectToDatabase from "../../../../lib/mongodb";
const crypto = require("crypto");

connectToDatabase();

function generateMerchantTransactionId() {
	const prefix = "MT";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let randomChars = "";
	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomChars += characters[randomIndex];
	}
	return prefix + randomChars;
}

function generateMerchantUserId(length = 30) {
	const prefix = "MU";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
	let userId = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		userId += characters[randomIndex];
	}
	return prefix + userId;
}

const sanitizeInput = (input) => {
	return input.replace(/[\u{1F600}-\u{1F64F}]/gu, ""); // Remove emojis
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { totalPrice, firstName } = req.body;
			const sanitizedFirstName = sanitizeInput(firstName); // Sanitize first name

			console.log(totalPrice, sanitizedFirstName);

			const payload = {
				merchantId: "PGTESTPAYUAT86",
				merchantTransactionId: generateMerchantTransactionId(),
				merchantUserId: generateMerchantUserId(),
				amount: totalPrice * 100,
				name: sanitizedFirstName,
				redirectUrl: "http://localhost:3000/api/order/phonepay/verify",
				redirectMode: "POST",
				callbackUrl: "http://localhost:3000/api/order/phonepay/verify",
				mobileNumber: "9999999999",
				paymentInstrument: {
					type: "PAY_PAGE",
				},
			};

			// Call the PhonePe API to initiate payment
			const phonePeResponse = await initiatePhonePePayment(payload);

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
async function initiatePhonePePayment(payload) {
	try {
		// Construct the payload
		console.log(payload);
		// Convert payload to Base64 encoded string
		const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
			"base64"
		);

		// Calculate X-VERIFY header
		const saltKey = "96434309-7796-489d-8924-ab56988a6076";
		const saltIndex = 1;
		const string = base64Payload + "/pg/v1/pay" + saltKey;
		const sha256 = crypto.createHash("sha256").update(string).digest("hex");
		const checksum = sha256 + "###" + saltIndex;

		console.log(checksum);

		const response = await axios.post(
			"https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/",
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
