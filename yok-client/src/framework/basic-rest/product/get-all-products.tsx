import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};

const fetchCustomProducts = async () => {
	const { data } = await http.get(API_ENDPOINTS.CUSTOMPRODUCTS);
	return {
		data: shuffle(data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useCustomProductsQuery = (options: QueryOptionsType) => {
	const result = useInfiniteQuery<PaginatedProduct, Error>({
		queryKey: [API_ENDPOINTS.CUSTOMPRODUCTS, {}] || [],
		queryFn: fetchCustomProducts,
		initialPageParam: 0,
		getNextPageParam: ({ paginatorInfo }) => paginatorInfo?.nextPageUrl,
	});
	return result;
};

const fetchProducts = async () => {
	const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
	return {
		data: shuffle(data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	const result = useInfiniteQuery<PaginatedProduct, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, {}] || [],
		queryFn: fetchProducts,
		initialPageParam: 0,
		getNextPageParam: ({ paginatorInfo }) => paginatorInfo?.nextPageUrl,
	});
	return result;
};

export {
	fetchCustomProducts,
	useCustomProductsQuery,
	useProductsQuery,
	fetchProducts,
};
