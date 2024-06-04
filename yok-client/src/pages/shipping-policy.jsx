import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";

// function makeTitleToDOMId(title: string) {
// 	return title.toLowerCase().split(" ").join("_");
// }

export default function ShippingPolicyPage({ shippingPolicyContent }) {
	console.log(shippingPolicyContent);
	return (
		<>
			<PageHeader pageHeader="Shipping & Delivery Policy" />
			<div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
				<Container>
					<div className="flex flex-col md:flex-row">
						<div className="pt-0 md:w-full lg:pt-2">
							<div className="mb-10">
								<div className="mb-4 text-lg font-bold md:text-xl lg:text-2xl text-heading">
									{"Shipping & Delivery Policy"}
								</div>
								<div
									className="text-sm leading-7 text-heading lg:text-base lg:leading-loose"
									dangerouslySetInnerHTML={{
										__html: shippingPolicyContent,
									}}
								/>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</>
	);
}

ShippingPolicyPage.Layout = Layout;

export async function getServerSideProps({ locale }) {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/shipping-policy/get`
		);
		const shippingPolicyContent =
			response.data.shippingPolicy.content || "";

		return {
			props: {
				...(await serverSideTranslations(locale, [
					"common",
					"forms",
					"menu",
					"terms",
					"footer",
				])),
				shippingPolicyContent,
			},
		};
	} catch (error) {
		console.error("Error fetching shipping policy :", error);
		return {
			props: {
				...(await serverSideTranslations(locale, [
					"common",
					"forms",
					"menu",
					"terms",
					"footer",
				])),
				shippingPolicyContent: "",
			},
		};
	}
}
