import React, { useState } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import usePrice from "@framework/product/use-price";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import { useUI } from "@contexts/ui.context";

export default function ProductPopup() {
	const { t } = useTranslation("common");

	const { openSearch, openModal, setModalView, isAuthorized } = useUI();

	var userData;
	const authToken = Cookies.get("token");
	if (authToken) {
		userData = JSON.parse(authToken);
		console.log("userData", userData);
	}

	const {
		modalData: { data },
		closeModal,
		openCart,
	} = useUI();
	const router = useRouter();
	const { addItemToCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
	const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
	const { price, basePrice, discount } = usePrice({
		amount: data.sale_price ? data.sale_price : data.price,
		baseAmount: data.price,
		currencyCode: "INR",
	});
	const variations = getVariations(data.variations);
	const { slug, image, name, description, _id } = data;

	const isSelected = !isEmpty(variations)
		? !isEmpty(attributes) &&
		  Object.keys(variations).every((variation) =>
				attributes.hasOwnProperty(variation)
		  )
		: true;

	function addToCart() {
		if (!isSelected) return;
		if (!userData) {
			setModalView("LOGIN_VIEW");
			return openModal();
		}
		// to show btn feedback while product carting
		setAddToCartLoader(true);
		setTimeout(() => {
			setAddToCartLoader(false);
			setViewCartBtn(true);
		}, 600);
		const item = generateCartItem(data!, attributes);
		addItemToCart(item, quantity);

		console.log(item, "item");
		console.log(attributes, "attributes");

		console.log(item.attributes, "item");
		console.log(item.attributes.color, "item");
		console.log(item.attributes.size, "item");

		// {
		//     "id": "6.M.Orange",
		//     "name": "Armani Wide-Leg Trousers",
		//     "slug": "armani-wide-leg-trousers",
		//     "image": "/assets/images/products/p-16.png",
		//     "price": 60,
		//     "attributes": {
		//         "size": "M",
		//         "color": "Orange"
		//     },
		//     "quantity": 1,
		//     "itemTotal": 60
		// }
		fetch("api/add-to-cart/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: userData?._id,
				slug: data._id,
				productId: data?._id,
				name: item.name,
				image: item.image,
				price: item.price,
				quantity,
				attributes: {
					size: item?.attributes?.size,
					color: item?.attributes?.color,
				},
				itemTotal: quantity * item.price,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to add item to cart");
				}
				// setAddToCartLoader(false);
				// setViewCartBtn(true);
			})
			.catch((error) => {
				console.error("Error adding item to cart:", error);
			});

		console.log(item, "item");
	}

	function navigateToProductPage() {
		closeModal();
		router.push(`/combo-product/${_id}`, undefined, {
			locale: router.locale,
		});
	}

	function handleAttribute(attribute: any) {
		setAttributes((prev) => ({
			...prev,
			...attribute,
		}));
	}

	function navigateToCartPage() {
		closeModal();
		setTimeout(() => {
			openCart();
		}, 300);
	}

	return (
		<div className="rounded-lg bg-white">
			<div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
				<div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
					<img
						src={
							image?.original ??
							"/assets/placeholder/products/product-thumbnail.svg"
						}
						alt={name}
						className="lg:object-cover lg:w-full lg:h-full"
					/>
				</div>

				<div className="flex flex-col p-5 md:p-8 w-full">
					<div className="pb-5">
						<div
							className="mb-2 md:mb-2.5 block -mt-1.5"
							onClick={navigateToProductPage}
							role="button"
						>
							<h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
								{name}
							</h2>
						</div>
						<p className="text-sm leading-6 md:text-body md:leading-7">
							{description}
						</p>

						<div className="flex items-center mt-3">
							<div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
								{price}
							</div>
							{discount && (
								<del className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
									{basePrice}
								</del>
							)}
						</div>
					</div>

					{Object.keys(variations).map((variation) => {
						return (
							<ProductAttributes
								key={`popup-attribute-key${variation}`}
								title={variation}
								attributes={variations[variation]}
								active={attributes[variation]}
								onClick={handleAttribute}
							/>
						);
					})}

					<div className="pt-2 md:pt-4">
						<div className="flex items-center justify-between mb-4 gap-x-3 sm:gap-x-4">
							<Counter
								quantity={quantity}
								onIncrement={() =>
									setQuantity((prev) => prev + 1)
								}
								onDecrement={() =>
									setQuantity((prev) =>
										prev !== 1 ? prev - 1 : 1
									)
								}
								disableDecrement={quantity === 1}
							/>
							<Button
								onClick={addToCart}
								variant="flat"
								className={`w-full h-11 md:h-12 px-1.5 ${
									!isSelected &&
									"bg-gray-400 hover:bg-gray-400"
								}`}
								disabled={!isSelected}
								loading={addToCartLoader}
							>
								{t("text-add-to-cart")}
							</Button>
						</div>

						{viewCartBtn && (
							<button
								onClick={navigateToCartPage}
								className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
							>
								{t("text-view-cart")}
							</button>
						)}

						<Button
							onClick={navigateToProductPage}
							variant="flat"
							className="w-full h-11 md:h-12"
						>
							{t("text-view-details")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
