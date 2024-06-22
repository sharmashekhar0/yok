import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import generateShiprocketToken from "src/lib/shiprocket-config";
import connectToDatabase from "src/lib/mongodb";

connectToDatabase();

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const { shipmentId } = req.query;
			console.log(req.query);
			if (!shipmentId) {
				return res
					.status(400)
					.json({ error: "Shipment ID is required" });
			}

			const token = await generateShiprocketToken();
			console.log("Shiprocket Token:", token);

			const response = await axios.get(
				`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(response);

			res.status(200).json(response.data);
		} catch (error) {
			console.error("Error fetching tracking details:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
