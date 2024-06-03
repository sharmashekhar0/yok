import connectToDatabase from "../../../lib/mongodb";
import PaymentGatewayKeys from "../../../models/PaymentGatewayKeys";
connectToDatabase();

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { active } = req.body;
			console.log(active);
			res.status(200).json({
				success: true,
				// activeGateway: activeKeys.activeGateway,
			});
		} catch (error) {
			console.error("Error fetching active payment gateway keys:", error);
			res.status(500).json({
				success: false,
				error: "Internal Server Error",
			});
		}
	} else {
		res.status(405).json({
			success: false,
			error: "Method Not Allowed",
		});
	}
}
