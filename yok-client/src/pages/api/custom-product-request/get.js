import connectToDatabase from "../../../lib/mongodb";
import CustomProductRequest from "../../../models/CustomProductRequest";
import jwt from "jsonwebtoken";

connectToDatabase();

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const customProductRequests = await CustomProductRequest.find();

			res.status(200).json(customProductRequests);
		} catch (error) {
			console.error("Error fetching custom product requests :", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
