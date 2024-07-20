import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import handleAxiosError from "../helpers/AxiosError";
import Category from "../oops/models/Category";

type props = { children?: React.ReactNode };

interface ContextInterface {
	categories: Category[];
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	isLoading: boolean;
	error: string;
	onMounted: () => void;
}

const defaultState = {
	categories: [],
	search: "",
	setSearch: () => {},
	isLoading: true,
	error: "",
	onMounted: () => {},
} as ContextInterface;

export const CategoryContext = React.createContext(defaultState);

const CategoryContextProvider = ({ children }: props) => {
	const [categories, setCategories] = React.useState<Category[]>(defaultState.categories);
	const [search, setSearch] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
	const [error, setError] = useState<string>(defaultState.error);

	const onMounted = async () => {
		setIsLoading(true);
		await axios
			.get("https://devquizzer.onrender.com/category")
			.then((res: AxiosResponse) => {
				const cats = Category.FactoryGetList(res.data);
				setCategories(cats);
				setIsLoading(false);
				setError("");
			})
			.catch((err: AxiosError) => {
				setIsLoading(false);
				setError(handleAxiosError(err));
			});
	};

	const contextValue: ContextInterface = { categories, search, setSearch, isLoading, error, onMounted };
	return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
};

export default CategoryContextProvider;
