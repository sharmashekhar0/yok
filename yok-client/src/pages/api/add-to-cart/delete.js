import Cart from "../../../models/Cart";
import connectToDatabase from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import User from "../../../models/User";
import Product from "../../../models/Products";

connectToDatabase();

export default async function handler(req, res) {
	if (req.method === "PATCH") {
		try {
			const { id } = req.body; // Assuming the ID of the item to reduce quantity is sent in the request body
			console.log("Id From Delete function :: ", id);
			// Find the cart item by ID
			const cartItem = await Cart.findById(id);
			console.log("Cart Item :: ", cartItem);
			if (!cartItem) {
				return res.status(404).json({ error: "Cart item not found" });
			}

			// Reduce the quantity by 1
			if (cartItem.quantity > 1) {
				cartItem.quantity -= 1;
			} else {
				// If quantity is already 1, remove the item from the cart
				await Cart.findByIdAndDelete(id);
				return res
					.status(200)
					.json({ message: "Cart item deleted successfully" });
			}

			// Save the updated cart item
			await cartItem.save();

			res.status(200).json({
				message: "Cart item quantity reduced successfully",
			});
		} catch (error) {
			console.error("Error reducing cart item quantity:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
