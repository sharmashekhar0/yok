import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import ReactStars from "react-rating-stars-component";
import { CheckBox } from "@components/ui/checkbox";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useUI } from "@contexts/ui.context";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

interface ReviewFormValues {
	name: string;
	email: string;
	cookie: string;
	message: string;
}

interface ReviewFormProps {
	productData: any;
}

var userData;
const authToken = Cookies.get("token");
if (authToken) {
	userData = JSON.parse(authToken);
	console.log("userData", userData);
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ReviewFormValues>();

	const { openSearch, openModal, setModalView, isAuthorized } = useUI();

	const [rating, setRating] = useState<any>(null);

	function onSubmit(values: ReviewFormValues) {
		console.log(values, "review");
		if (!userData) {
			setModalView("LOGIN_VIEW");
			return openModal();
		}
		let data = {
			message: values?.message,
			name: values?.name,
			email: values?.email,
			rating: rating,
			productId: productData?._id,
			productName: productData?.name,
			userId: userData._id,
			userName: userData.name,
			userEmail: userData.email,
		};

		fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/rating/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to add item to cart");
				}
				toast.success("Rating Submitted");
			})
			.catch((error) => {
				console.error("Error adding item to cart:", error);
				toast.error("Error submitting review");
			});
	}
	const ratingChanged = (newRating: any) => {
		console.log(newRating);
		setRating(newRating);
	};
	const { t } = useTranslation();
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full mx-auto flex flex-col justify-center mt-6 lg:mt-8"
			noValidate
		>
			<div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
				<div className="pb-1.5">
					<label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
						{t("forms:label-your-rating")}
					</label>
					<ReactStars
						count={5}
						onChange={ratingChanged}
						size={20}
						color="#c6c6c6"
						activeColor="#202020"
					/>
				</div>
				<TextArea
					labelKey="forms:label-message-star"
					{...register("message", {
						required: "Message is required",
					})}
					errorKey={errors.message?.message}
				/>
				<div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
					<Input
						labelKey="forms:label-name-star"
						{...register("name", { required: "Name is required" })}
						className="w-full md:w-1/2 "
						errorKey={errors.name?.message}
						variant="solid"
					/>
					<Input
						labelKey="forms:label-email-star"
						type="email"
						{...register("email", {
							required: "forms:email-required",
							pattern: {
								value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "forms:email-error",
							},
						})}
						className="w-full md:w-1/2 ltr:md:ml-2.5 rtl:md:mr-2.5 ltr:lg:ml-5 rtl:lg:mr-5 mt-2 md:mt-0"
						errorKey={errors.email?.message}
						variant="solid"
					/>
				</div>
				{/* <CheckBox
          {...register("cookie")}
          labelKey="forms:label-save-review-information"
        /> */}
				<div className="pt-1">
					<Button
						type="submit"
						className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
					>
						{t("common:button-submit")}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default ReviewForm;
