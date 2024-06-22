import { useOrderQuery } from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";
import Link from "next/link";

const OrderItemCard = ({ product }: { product: OrderItem }) => {
	console.log(product); // Check if the product data is received correctly

	const { price: itemTotal } = usePrice({
		amount: product?.selling_price * product?.units,
		currencyCode: "INR",
	});

	return (
		<tr
			className="font-normal border-b border-gray-300 last:border-b-0"
			key={product._id}
		>
			<td className="p-4 flex items-center">
				<Link href={`/products/${product?.name}`}>{product.name}</Link>{" "}
				* {product.units}
			</td>
			<td className="p-4">
				{product?.selling_price} * {product.units} = {itemTotal}
			</td>
		</tr>
	);
};

const OrderDetails: React.FC<{ className?: string }> = ({
	className = "pt-10 lg:pt-12",
}) => {
	const {
		query: { id },
	} = useRouter();
	const { t } = useTranslation("common");
	const { data: order, isLoading } = useOrderQuery(id?.toString()!);
	console.log(order);
	if (isLoading) return <p>Loading...</p>;

	const totalWithShipping = order
		? order?.totalPrice + (order.shipping_fee || 0)
		: 0;

	return (
		<div className={className}>
			<h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
				{t("text-order-details")}:
			</h2>
			<table className="w-full text-sm font-semibold text-heading lg:text-base">
				<thead>
					<tr>
						<th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
							{t("text-product")}
						</th>
						<th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
							{t("text-total")}
						</th>
					</tr>
				</thead>
				<tbody>
					{order?.products.map((product) => (
						<OrderItemCard key={product.id} product={product} />
					))}
				</tbody>
				<tfoot>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-sub-total")}:</td>
						<td className="p-4">{order?.totalPrice}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-shipping")}:</td>
						<td className="p-4">
							{order?.shipping_fee}
							<span className="text-[13px] font-normal ltr:pl-1.5 rtl:pr-1.5 inline-block">
								via Flat rate
							</span>
						</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">
							{t("text-payment-method")}:
						</td>
						<td className="p-4">{order?.paymentMethod}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("text-total")}:</td>
						<td className="p-4">{totalWithShipping}</td>
					</tr>
					{order?.note && (
						<tr className="odd:bg-gray-150">
							<td className="p-4 italic">{t("text-note")}:</td>
							<td className="p-4">new order</td>
						</tr>
					)}
				</tfoot>
			</table>
		</div>
	);
};

export default OrderDetails;
