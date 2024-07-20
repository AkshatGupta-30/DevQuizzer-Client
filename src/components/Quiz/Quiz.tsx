import { memo } from "react";
import Summary from "../Summary/Summary";
import "./Quiz.scss";
import QuestionPanel from "../QuestionPanel/QuestionPanel";

const Quiz = memo(() => {
	return (
		<div className='quiz-area'>
			<div className='heading'>Quizz!</div>
			<hr />
			<div className='content'>
				<Summary />
				<QuestionPanel />
			</div>
			<hr />
		</div>
	);
});

export default Quiz;
