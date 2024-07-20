import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import QuestionApi from "../services/QuestionApi";
import Question from "../oops/models/Question";

type props = { children?: React.ReactNode };

export interface QuesReqContextInterface {
	ques: {
		category: string;
		question: string;
		option1: string;
		option2: string;
		option3: string;
		option4: string;
		answer: number;
		difficulty: string;
		explaination: string;
		linkedIn: string;
	};
	changedValues: (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	submit: () => Promise<boolean>;
}

const defaultState = {
	ques: {
		category: "Category",
		question: "",
		option1: "",
		option2: "",
		option3: "",
		option4: "",
		answer: 0,
		difficulty: "Difficulty",
		explaination: "",
		linkedIn: "",
	},
	changedValues: () => {},
	submit: async () => false,
} as QuesReqContextInterface;

export const QuestionRequestContext = React.createContext(defaultState);

const QuestionRequestContextProvider = ({ children }: props) => {
	const [ques, setQ] = useState<QuesReqContextInterface["ques"]>(defaultState.ques);

	useEffect(() => clearData(), []);

	const changedValues = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setQ({
			...ques,
			[event.target.name]: event.target.value,
		});
	};

	function clearData() {
		setQ(defaultState.ques);
	}

	async function submit(): Promise<boolean> {
		const responseCode = await QuestionApi.AddQuesRequest(Question.addQues(ques));
		if (responseCode === 200) {
			clearData();
			toast.success(<h4>Request sent successfully!</h4>);
			return true;
		}
		toast.error(
			<h4>
				Unable to send reqest.
				<br />
				Please try again later
			</h4>
		);
		return false;
	}

	const contextValue: QuesReqContextInterface = { ques, changedValues, submit };
	return <QuestionRequestContext.Provider value={contextValue}>{children}</QuestionRequestContext.Provider>;
};

export default QuestionRequestContextProvider;
