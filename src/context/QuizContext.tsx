import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import Category from "../oops/models/Category";
import axios, { AxiosError } from "axios";
import Question from "../oops/models/Question";
import handleAxiosError from "../helpers/AxiosError";

interface ContextInterface {
	category: Category;
	questions: Question[];
	setQuestions: Dispatch<SetStateAction<Question[]>>;
	currQ: number;
	setCurrQ: Dispatch<SetStateAction<number>>;
	myAns: number[];
	setMyAns: Dispatch<SetStateAction<number[]>>;
	startQuiz: boolean;
	setStartQuiz: Dispatch<SetStateAction<boolean>>;
	bankLength: number;
	bankPage: number;
	setBankPage: Dispatch<SetStateAction<number>>;
	checkSubmit: boolean;
	setCheckSubmit: Dispatch<SetStateAction<boolean>>;
	submit: boolean;
	setSubmit: Dispatch<SetStateAction<boolean>>;
	correct: boolean[];
}

const defaultState = {
	category: Category.empty(),
	questions: [],
	setQuestions: () => {},
	currQ: -1,
	setCurrQ: () => {},
	myAns: [],
	setMyAns: () => {},
	startQuiz: false,
	setStartQuiz: () => {},
	bankLength: 20,
	bankPage: 1,
	setBankPage: () => {},
	checkSubmit: false,
	setCheckSubmit: () => {},
	submit: false,
	setSubmit: () => {},
	correct: [],
} as ContextInterface;

export const QuizzContext = createContext(defaultState);

const QuizzContextProvider = ({ category, children }: { category: Category; children?: React.ReactNode }) => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [currQ, setCurrQ] = useState<number>(defaultState.currQ);
	const [myAns, setMyAns] = useState<number[]>(defaultState.myAns);
	const [startQuiz, setStartQuiz] = useState<boolean>(defaultState.startQuiz);
	const [bankPage, setBankPage] = useState<number>(defaultState.bankPage);
	const [checkSubmit, setCheckSubmit] = useState<boolean>(defaultState.checkSubmit);
	const [submit, setSubmit] = useState<boolean>(defaultState.submit);
	const [correct, setCorrect] = useState<boolean[]>(defaultState.correct);
	const bankLength: number = defaultState.bankLength;

	useEffect(() => {
		setMyAns((prevAns) => {
			const updatedAns = [...prevAns];
			category.questions.forEach((_, index: number) => {
				updatedAns[index] = -1;

			});
			return updatedAns;
		});
		const fetchData = async () => {
			axios
				.get("https://devquizzer.onrender.com/ques/questions-by-ids", {
					params: {
						ids: category.questions.join(","),
					},
				})
				.then((response) => {
					setQuestions(Question.factoryList(response.data));
				})
				.catch((error: AxiosError) => {
					handleAxiosError(error)
				});
		};
		fetchData();
	}, [category]);

	useEffect(() => {
		if (submit) {
			setCheckSubmit(false);
			setCurrQ(0);
			setCorrect(questions.map((ques: Question, i: number) => ques.answer === myAns[i]));
		}
	}, [submit]);

	const contextValue: ContextInterface = {
		category,
		questions,
		setQuestions,
		currQ,
		setCurrQ,
		myAns,
		setMyAns,
		startQuiz,
		setStartQuiz,
		bankLength,
		bankPage,
		setBankPage,
		checkSubmit,
		setCheckSubmit,
		submit,
		setSubmit,
		correct,
	};
	return <QuizzContext.Provider value={contextValue}>{children}</QuizzContext.Provider>;
};

export default QuizzContextProvider;
