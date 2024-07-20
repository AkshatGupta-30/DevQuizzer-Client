import { memo } from "react";
import { useLocation } from "react-router-dom";
import "./QuizzPage.scss";
import QuizzContextProvider from "../../context/QuizContext";
import Quiz from "../../components/Quiz/Quiz";
import Category from "../../oops/models/Category";

const Page = memo(() => {
	return (
		<div className='quizz'>
			<Quiz />
		</div>
	);
});

const QuizzPage = memo(() => {
	const location = useLocation();
	const category: Category = location.state.category;

	return (
		<QuizzContextProvider category={category}>
			<Page />
		</QuizzContextProvider>
	);
});

export default QuizzPage;
