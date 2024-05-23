import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import { useEffect, useState, type FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { Product } from "@framework/types";
interface ProductGridProps {
	className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
	const { query } = useRouter();
	const [filteredProducts, setFilteredProducts] = useState([]);
	console.log(query);
	console.log("query", query);

	const {
		isFetching: isLoading,
		isFetchingNextPage: loadingMore,
		fetchNextPage,
		hasNextPage,
		data,
		error,
	} = useProductsQuery({});
	if (error) return <p>{error.message}</p>;

	const { t } = useTranslation("common");

	const parsePriceRange = (priceRange: string): [number, number] => {
		const [minPrice, maxPrice] = priceRange.split("-").map(Number);
		return [minPrice, maxPrice];
	};

	const parseDate = (dateString: string): Date => {
		return new Date(dateString);
	};

	const filterAndSortProducts = (
		products: Product[],
		query: any
	): Product[] => {
		const { sort_by, brand, query: tag, category, price } = query;

		let filteredProducts = products;

		if (category) {
			filteredProducts = filteredProducts.filter((product) =>
				product?.category?.includes(category)
			);
			console.log("Category Filtered :: ", filteredProducts);
		}

		if (tag) {
			filteredProducts = filteredProducts.filter((product) =>
				product?.tags?.some(
					(productTag: { slug: string }) => productTag.slug === tag
				)
			);
		}

		if (brand) {
			filteredProducts = filteredProducts.filter((product) =>
				product?.brand?.toLowerCase().includes(brand.toLowerCase())
			);
		}

		if (price) {
			const [minPrice, maxPrice] = parsePriceRange(price);
			filteredProducts = filteredProducts.filter(
				(product) =>
					product?.sale_price >= minPrice && product.price <= maxPrice
			);
		}

		if (sort_by) {
			switch (sort_by) {
				case "newest":
					filteredProducts.sort((a, b) => {
						const dateA = parseDate(a.createdAt);
						const dateB = parseDate(b.createdAt);
						return dateB - dateA;
					});
					console.log("Newest :: ", filteredProducts);
					break;
				case "popularity":
					// Add your popularity sorting logic here
					break;
				case "low-high":
					filteredProducts.sort(
						(a, b) => a?.sale_price - b?.sale_price
					);
					break;
				case "high-low":
					filteredProducts.sort(
						(a, b) => b?.sale_price - a?.sale_price
					);
					break;
				default:
					break;
			}
		}

		console.log("After Sort by :: ", filteredProducts);

		return filteredProducts;
	};

	useEffect(() => {
		if (data?.pages) {
			// Flattening the paginated data
			const products = data.pages.flatMap((page) => page.data);
			const filtered = filterAndSortProducts(products, query);
			setFilteredProducts(filtered); // Setting filtered products
		}
	}, [data, query]);

	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading && !data?.pages?.length ? (
					<ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					filteredProducts?.map((product: Product) => (
						<ProductCard
							key={`product--key${product.id}`}
							product={product}
							variant="grid"
						/>
					))
				)}
			</div>
			{/* <div className="text-center pt-8 xl:pt-14">
				{hasNextPage && (
					<Button
						loading={loadingMore}
						disabled={loadingMore}
						onClick={() => fetchNextPage()}
						variant="slim"
					>
						{t("button-load-more")}
					</Button>
				)}
			</div> */}
		</>
	);
};
