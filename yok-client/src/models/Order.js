import mongoose from "mongoose";

let Order;

try {
	Order = mongoose.model("Order");
} catch {
	const OrderSchema = new mongoose.Schema(
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			products: [
				{
					name: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "Product",
					},
					units: {
						type: Number,
						required: true,
					},
					selling_price: {
						type: Number,
						required: true,
					},
					sku: {
						type: mongoose.Schema.Types.ObjectId,
						required: true,
					},
				},
			],
			totalPrice: {
				type: Number,
				required: true,
			},
			tracking_number: { type: String },
			shippingAddress: {
				firstName: {
					type: String,
					required: true,
				},
				lastName: {
					type: String,
					required: true,
				},
				address: {
					type: String,
					required: true,
				},
				phone: {
					type: String,
					required: true,
				},
				email: {
					type: String,
					required: true,
				},
				city: {
					type: String,
					required: true,
				},
				pincode: {
					type: String,
					required: true,
				},
				state: {
					type: String,
					required: true,
				},
				orderNotes: {
					type: String,
				},
			},
			status: {
				type: String,
				enum: ["pending", "processing", "shipped", "delivered", "paid"],
				default: "pending",
			},
			paymentMethod: {
				type: String,
				required: true,
			},
			paymentStatus: {
				type: String,
				enum: ["pending", "completed", "failed"],
				default: "pending",
			},
			transactionId: {
				type: String,
			},
			shipment_order_id: {
				type: String,
				default: null,
			},
			shipping_id: {
				type: String,
				default: null,
			},
		},
		{ timestamps: true }
	);

	Order = mongoose.model("Order", OrderSchema);
}

export default Order;
