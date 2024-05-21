import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header-three";
import { default as Footer } from "@components/layout/footer/footer-two";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";
import CookieBar from "@components/common/cookie-bar";
import { useAcceptCookies } from "@utils/use-accept-cookies";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/cart/cart.context";
import { useEffect } from "react";
import axios from "axios";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
	const { t } = useTranslation("common");

	const { addItemToCart } = useCart();
	useEffect(() => {
		const loadCartData = async () => {
			try {
				const response = await axios.get("/api/add-to-cart/get");
				console.log("response cart", response);
				console.log("response cart", response?.data?.cartItems);
				response?.data?.cartItems.map((item) => {
					addItemToCart(item, item.quantity);
				});
			} catch (error) {
				console.log("error on get cart", error);
			}
		};
		loadCartData();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<NextSeo
				additionalMetaTags={[
					{
						name: "viewport",
						content: "width=device-width, initial-scale=1.0",
					},
				]}
				title="YOK"
				description=""
				canonical="Yok.con.in"
				openGraph={{
					url: "Yok.con.in",
					title: "YOK",
					description: "",
					images: [
						{
							url: "/assets/images/og-image-01.png",
							width: 800,
							height: 600,
							alt: "Og Image Alt",
						},
						{
							url: "/assets/images/og-image-02.png",
							width: 900,
							height: 800,
							alt: "Og Image Alt Second",
						},
					],
				}}
			/>
			<Header />
			<main
				className="relative flex-grow"
				style={{
					minHeight: "-webkit-fill-available",
					WebkitOverflowScrolling: "touch",
				}}
			>
				{children}
			</main>
			<Footer />
			<MobileNavigation />
			<Search />
			<CookieBar
				title={t("text-cookies-title")}
				hide={acceptedCookies}
				action={
					<Button onClick={() => onAcceptCookies()} variant="slim">
						{t("text-accept-cookies")}
					</Button>
				}
			/>
		</div>
	);
}
