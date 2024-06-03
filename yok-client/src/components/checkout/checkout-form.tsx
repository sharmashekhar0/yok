import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import Button from "@components/ui/button";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useEffect, useState } from "react";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import Cookies from "js-cookie";
import axios from "axios";

interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	pincode: string;
	save: boolean;
	state: string;
	note: string;
	paymentMethod: string;
	response: object;
}

let currentUserData;
const authToken = Cookies.get("token");
if (authToken) {
	currentUserData = JSON.parse(authToken);
}
const CheckoutForm: React.FC = () => {
	const { t } = useTranslation();
	const [selectedOption, setSelectedOption] = useState<string>("online");
	const { mutate: updateUser, isPending } = useCheckoutMutation();
	const [activeGateway, setActiveGateway] = useState<string>("");

	useEffect(() => {
		// Fetch active payment gateway when component mounts
		fetchActiveGateway();
	}, []);

	const fetchActiveGateway = async () => {
		try {
			// Fetch active payment gateway from the API
			const response = await http.get(
				API_ENDPOINTS.GET_ACTIVE_PAYMENT_GATEWAY
			);
			setActiveGateway(response.data.activeGateway);
		} catch (error) {
			console.error("Error fetching active payment gateway:", error);
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();
	console.log("selectedOption", selectedOption);

	const { items, total, isEmpty, discount } = useCart();
	let discountedAmount = total;
	if (typeof discount === "number") {
		discountedAmount = total - discount;
	}
	const { price: subtotal } = usePrice({
		amount: discountedAmount,
		currencyCode: "INR",
	});

	// async function onSubmit1(input: CheckoutInputType) {
	// 	const allProduct = items.map((product) => ({
	// 		product: product._id,
	// 		quantity: product?.quantity || 0,
	// 	}));
	// 	const inputData: CheckoutInputType = {
	// 		...input,
	// 		paymentMethod: selectedOption,
	// 	};
	// 	if (selectedOption === "online") {
	// 	} else if (selectedOption === "cod") {
	// 	}
	// 	const { data: razorpayKeys } = await http.get(
	// 		API_ENDPOINTS.GET_RAZORPAYKEYS
	// 	);
	// 	inputData.totalPrice = discountedAmount;
	// 	const { data } = await http.post(
	// 		API_ENDPOINTS.CREATE_ORDER_PHONEPAY_PAYMENT,
	// 		inputData
	// 	);
	// 	console.log(data.res.success);
	// 	if (data.res.success) {
	// 		console.log(data.res.data.instrumentResponse.redirectInfo.url);
	// 		Router.push(data.res.data.instrumentResponse.redirectInfo.url);
	// 		return;
	// 	}
	// 	if (selectedOption === "online") {
	// 		if (data.success) {
	// 			var options = {
	// 				key: razorpayKeys.keys.key,
	// 				amount: data.order.amount,
	// 				currency: "INR",
	// 				name: "YOK",
	// 				description: "Test Transaction",
	// 				image: "http://localhost:3000/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=96&q=75",
	// 				order_id: data.order.id,
	// 				handler: function (response: any) {
	// 					console.log(response);
	// 					onPaymentSuccess({ input, response });
	// 					// updateUser({ ...input, response });
	// 				},
	// 				prefill: {
	// 					name: "John doe",
	// 					email: "johndoe@gmail.com",
	// 					contact: "9999999999",
	// 				},
	// 				notes: {
	// 					test: "This is test function",
	// 				},
	// 				theme: {
	// 					color: "#3399cc",
	// 				},
	// 			};
	// 			var rzp1 = new window.Razorpay(options);
	// 			rzp1.open();
	// 			rzp1.on("payment.failed", function (response: any) {
	// 				alert(response.error.code);
	// 				alert(response.error.description);
	// 				alert(response.error.source);
	// 				alert(response.error.step);
	// 				alert(response.error.reason);
	// 				alert(response.error.metadata.order_id);
	// 				alert(response.error.metadata.payment_id);
	// 			});
	// 		}
	// 	}
	// 	// if (!isEmpty) {
	// 	//   console.log("updateUser", updateUser);
	// 	//   console.log("Test payment button clicked!");
	// 	//   const { data: razorpayKeys } = await http.get(
	// 	//     API_ENDPOINTS.GET_RAZORPAYKEYS
	// 	//   );
	// 	//   const { data } = await http.post(API_ENDPOINTS.CREATE_ORDER_PAYMENT, {
	// 	//     user: userData?._id,
	// 	//     products: allProduct,
	// 	//     totalPrice: total,
	// 	//     tracking_number: 0,
	// 	//     shippingAddress: input,
	// 	//     status: "pending",
	// 	//     paymentMethod: selectedOption,
	// 	//     paymentStatus: "pending",
	// 	//     transactionId: "",
	// 	//   });
	// 	//   console.log(data);
	// 	//   if (data.success) {
	// 	//     var options = {
	// 	//       key: razorpayKeys.keys.key,
	// 	//       amount: "50000",
	// 	//       currency: "INR",
	// 	//       name: "YOK",
	// 	//       description: "Test Transaction",
	// 	//       image:
	// 	//         "http://localhost:3000/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=96&q=75",
	// 	//       order_id: data.order.id,
	// 	//       handler: function (response: any) {
	// 	//         console.log(response);
	// 	//         updateUser({ ...input, response });
	// 	//       },
	// 	//       prefill: {
	// 	//         name: "John doe",
	// 	//         email: "johndoe@gmail.com",
	// 	//         contact: "9999999999",
	// 	//       },
	// 	//       notes: {
	// 	//         test: "This is test function",
	// 	//       },
	// 	//       theme: {
	// 	//         color: "#3399cc",
	// 	//       },
	// 	//     };
	// 	//     var rzp1 = new window.Razorpay(options);
	// 	//     rzp1.open();
	// 	//     rzp1.on("payment.failed", function (response: any) {
	// 	//       alert(response.error.code);
	// 	//       alert(response.error.description);
	// 	//       alert(response.error.source);
	// 	//       alert(response.error.step);
	// 	//       alert(response.error.reason);
	// 	//       alert(response.error.metadata.order_id);
	// 	//       alert(response.error.metadata.payment_id);
	// 	//     });
	// 	//   }
	// 	//   updateUser(input);
	// 	// }

	// 	// Router.push(ROUTES.ORDER);
	// }

	async function onSubmit(input: CheckoutInputType) {
		try {
			const inputData: CheckoutInputType = {
				...input,
				paymentMethod: selectedOption,
				totalPrice: discountedAmount,
			};

			console.log("inputData", inputData);
			console.log(inputData);
			// Step 1: Create

			const allProduct = items.map((product) => ({
				name: product._id,
				sku: product._id,
				units: product?.quantity || 0,
				selling_price: product.price,
			}));
			const orderData = {
				user: currentUserData?._id,
				products: allProduct,
				totalPrice: discountedAmount,
				tracking_number: 0,
				shippingAddress: input,
				status: "pending",
				paymentMethod: selectedOption,
				paymentStatus: "pending",
				transactionId: "",
			};
			const { data: orderResponse } = await http.post(
				API_ENDPOINTS.CREATE_ORDER,
				orderData
			);
			console.log("Order created:", orderResponse);

			// Step 2: Make Payment
			if (selectedOption === "online") {
				if (activeGateway === "phonepe") {
					// Make phonepe payment
					console.log("Making phonepe payment...");
					inputData.totalPrice = discountedAmount;
					const { data } = await axios.post(
						API_ENDPOINTS.CREATE_ORDER_PHONEPAY_PAYMENT,
						inputData
					);
					console.log(data.res.success);
					await updateOrderStatus(orderResponse._id);
					if (data.res.success) {
						console.log(
							data.res.data.instrumentResponse.redirectInfo.url
						);
						Router.push(
							data.res.data.instrumentResponse.redirectInfo.url
						);
						return;
					}
				} else if (activeGateway === "razorpay") {
					const { data } = await http.post(
						API_ENDPOINTS.CREATE_ORDER_PAYMENT,
						inputData
					);
					const { data: razorpayKeys } = await http.get(
						API_ENDPOINTS.GET_RAZORPAYKEYS
					);
					console.log(data);

					var options = {
						key: razorpayKeys.keys.key,
						amount: data.order.amount,
						currency: "INR",
						name: "YOK",
						description: "Test Transaction",
						image: "http://localhost:3000/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=96&q=75",
						order_id: data.order.id,
						handler: function (response: any) {
							console.log(response);
							onPaymentSuccess({ input, response });
							updateOrderStatus(orderResponse._id);
						},
						prefill: {
							name: `${inputData.firstName} ${inputData.lastName}`,
							email: inputData.email,
							contact: inputData.phone,
						},
						notes: {
							test: "This is test function",
						},
						theme: {
							color: "#3399cc",
						},
					};
					var rzp1 = new window.Razorpay(options);
					rzp1.open();
					rzp1.on("payment.failed", function (response: any) {
						alert(response.error.code);
						alert(response.error.description);
						alert(response.error.source);
						alert(response.error.step);
						alert(response.error.reason);
						alert(response.error.metadata.order_id);
						alert(response.error.metadata.payment_id);
					});

					// Make razorpay payment
					console.log("Making razorpay payment...");
				}
			} else if (selectedOption === "cod") {
				console.log("Order placed with Cash on Delivery.");
			}
		} catch (error) {
			console.error("Error processing order:", error);
		}
	}

	async function onPaymentSuccess(response: CheckoutInputType) {
		console.log(response);
		const { response: PaymentVerification, input: userData } = response;

		// verify this payment

		const { data } = await http.post(
			API_ENDPOINTS.VERIFY_ORDER_PAYMENT,
			PaymentVerification
		);
		console.log(data);
		if (data.success) {
			// save order in db
			console.log(userData);

			// const allProduct = items.map((product) => ({
			// 	product: product._id,
			// 	quantity: product?.quantity || 0,
			// }));

			// const { data } = await http.post(API_ENDPOINTS.CREATE_ORDER, {
			// 	user: currentUserData?._id,
			// 	products: allProduct,
			// 	totalPrice: subtotal,
			// 	tracking_number: 0,
			// 	userData: userData,
			// 	status: "pending",
			// 	paymentMethod: selectedOption,
			// 	paymentStatus: "pending",
			// 	transactionId: PaymentVerification.razorpay_payment_id,
			// });
		}
		// console.log(data);
		// alert("order created");
		// Router.push(ROUTES.ORDER);
	}
	// New Function to Handle Test Payment
	const handleTestPayment = async (e: any) => {
		e.preventDefault();
		console.log(updateUser);
	};

	useEffect(() => {
		const storedOption = localStorage.getItem("selectedPaymentOption");
		if (storedOption) {
			setSelectedOption(storedOption);
		}
	}, []);

	const handleOptionChange = (event) => {
		const { value } = event.target;
		setSelectedOption(value);
		localStorage.setItem("selectedPaymentOption", value);
	};

	async function updateOrderStatus(orderId: string) {
		try {
			// Make API call to update order status
			const response = await http.get(
				`${API_ENDPOINTS.UPDATE_ORDER}?id=${orderId}`
			);
			console.log("Order status updated:", response.data);
		} catch (error) {
			console.error("Error updating order status:", error);
		}
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-shipping-address")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="forms:label-first-name"
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							errorKey={errors.firstName?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>
						<Input
							labelKey="forms:label-last-name"
							{...register("lastName", {
								required: "forms:last-name-required",
							})}
							errorKey={errors.lastName?.message}
							variant="solid"
							className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
						/>
					</div>
					<Input
						labelKey="forms:label-address"
						{...register("address", {
							required: "forms:address-required",
						})}
						errorKey={errors.address?.message}
						variant="solid"
					/>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							type="tel"
							labelKey="forms:label-phone"
							{...register("phone", {
								required: "forms:phone-required",
							})}
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>

						<Input
							type="email"
							labelKey="forms:label-email-star"
							{...register("email", {
								required: "forms:email-required",
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "forms:email-error",
								},
							})}
							errorKey={errors.email?.message}
							variant="solid"
							className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
						/>
					</div>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="forms:label-city"
							{...register("city")}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>

						<Input
							labelKey="State *"
							{...register("state")}
							variant="solid"
							className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
						/>
					</div>
					<Input
						labelKey="Postcode *"
						{...register("pincode")}
						variant="solid"
						className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
					/>
					<div className="items-center">
						<p>Select Payment Option</p>
						<div>
							<input
								id="online-payment"
								type="radio"
								name="payment-option"
								value="online"
								checked={selectedOption === "online"}
								onChange={handleOptionChange}
							/>
							<label
								htmlFor="online-payment"
								style={{ marginLeft: "10px" }}
							>
								Online
							</label>
						</div>
						<div>
							<input
								id="cod-payment"
								type="radio"
								name="payment-option"
								value="cod"
								checked={selectedOption === "cod"}
								onChange={handleOptionChange}
							/>
							<label
								htmlFor="cod-payment"
								style={{ marginLeft: "10px" }}
							>
								Cash on Delivery
							</label>
						</div>
					</div>
					<TextArea
						labelKey="forms:label-order-notes"
						{...register("note")}
						placeholderKey="forms:placeholder-order-notes"
						className="relative pt-3 xl:pt-6"
					/>
					<div className="flex w-full">
						<Button
							className="w-full sm:w-auto"
							loading={isPending}
							disabled={isPending}
						>
							{t("common:button-place-order")}
						</Button>
						{/* <Button
              onClick={(e) => {
                handleTestPayment(e);
              }}
            >
              Phonepay Payment
            </Button> */}
					</div>
				</div>
			</form>
		</>
	);
};

export default CheckoutForm;
