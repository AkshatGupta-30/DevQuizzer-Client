import { memo, useContext } from "react";
import "./Summary.scss";
import { QuizzContext } from "../../context/QuizContext";
import { QuestionStatus } from "../../oops/enum/QuestionStatus";
import Question from "../../oops/models/Question";

function getQuestionClass(status: QuestionStatus): string {
	switch (status) {
		case "Answered":
			return "answered";
		case "Marked For Review":
			return "review";
		case "Not Answered":
			return "not-answered";
		default:
			return "not-visited";
	}
}

const AnswerStatus = () => {
	const { startQuiz, questions, currQ, setCurrQ, checkSubmit, submit, correct } = useContext(QuizzContext);

	const getStatusCount = (status: QuestionStatus): number =>
		questions.filter((ques) => ques.questionStatus === status).length;

	const getNextLegendStatus = (status: QuestionStatus): number => {
		let i = currQ + 1 === questions.length ? 0 : currQ + 1;
		for (let len: number = questions.length; len > 0; i++, len--) {
			if (i === questions.length) i = 0;
			if (questions[i].questionStatus === status) return i;
		}
		return -1;
	};

	const getNextAnswerStatus = (status: boolean): number => {
		let i = currQ + 1 === correct.length ? 0 : currQ + 1;
		for (let len: number = correct.length; len > 0; i++, len--) {
			if (i === correct.length) i = 0;
			if (correct[i] === status) return i;
		}
		return -1;
	};

	function getLabelClass(status: QuestionStatus): string | null {
		if (checkSubmit) {
			let count;
			switch (status) {
				case QuestionStatus.MarkForReview:
					count = questions.filter(
						(ques: Question) => ques.questionStatus === QuestionStatus.MarkForReview
					).length;
					return count ? "blink" : null;
				case QuestionStatus.NotAnswered:
					count = questions.filter(
						(ques: Question) => ques.questionStatus === QuestionStatus.NotAnswered
					).length;
					return count ? "blink" : null;
			}
		}
		return null;
	}

	return (
		<div className='answer-status'>
			<h2>Answer Status</h2>
			<div className='legends'>
				{!submit && (
					<div className='legend'>
						<div className={`color current`}>{currQ !== -1 ? currQ + 1 : null}</div>
						<div className={"label"}>Current</div>
					</div>
				)}
				{!submit &&
					Object.values(QuestionStatus).map((status, i) => (
						<div className='legend' key={i}>
							<div
								className={`color ${getQuestionClass(status)}`}
								style={{
									cursor: startQuiz ? "pointer" : "none",
									pointerEvents: startQuiz ? "all" : "none",
								}}
								onClick={() => {
									const nextFind: number = getNextLegendStatus(status);
									if (nextFind !== -1) {
										setCurrQ(nextFind);
									}
								}}>
								{getStatusCount(status as QuestionStatus)}
							</div>
							<div className={`label ${getLabelClass(status as QuestionStatus)}`}>{status}</div>
						</div>
					))}
				{submit && (
					<>
						<div
							className='legend'
							style={{ pointerEvents: correct.filter((cor) => cor).length === 0 ? "none" : "all" }}
							onClick={() => {
								const nextFind: number = getNextAnswerStatus(correct[currQ]);
								if (nextFind !== -1) {
									setCurrQ(nextFind);
								}
							}}>
							<div className={`color correct`}>{correct.filter((corr) => corr).length}</div>
							<div className={"label"}>Correct</div>
						</div>
						<div
							className='legend'
							style={{ pointerEvents: correct.filter((cor) => cor).length === 0 ? "none" : "all" }}
							onClick={() => {
								const nextFind: number = getNextAnswerStatus(correct[currQ]);
								if (nextFind !== -1) {
									setCurrQ(nextFind);
								}
							}}>
							<div className={`color incorrect`}>{correct.filter((corr) => !corr).length}</div>
							<div className={"label"}>Incorrect</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const FixedBank = () => {
	const { questions, currQ, setCurrQ, submit, correct } = useContext(QuizzContext);

	return (
		<div className='numbers'>
			{questions.map((ques: Question, i: number) => {
				if (submit)
					return (
						<li key={i} className={correct[i] ? "correct" : "incorrect"} onClick={() => setCurrQ(i)}>
							{i + 1}
						</li>
					);
				return (
					<li
						key={i}
						className={currQ === i ? "current" : getQuestionClass(ques.questionStatus)}
						onClick={() => {
							if (ques.questionStatus !== QuestionStatus.NotVisited) {
								setCurrQ(i);
							}
						}}>
						{i + 1}
					</li>
				);
			})}
			{questions.length < 5 && Array.from({ length: 5 - questions.length }, (_, i) => <li key={i}></li>)}
		</div>
	);
};

const MoreBank = () => {
	const { questions, currQ, setCurrQ, bankLength, bankPage, setBankPage, submit, correct } = useContext(QuizzContext);

	return (
		<>
			<div className='numbers blank-page'>
				{Array.from({ length: bankLength }, (_, i) => {
					const num = (bankPage - 1) * bankLength + i;
					if (submit) return <li className={correct[num] ? "correct" : "incorrect"}>{num}</li>;

					const quesStatus = questions[num]?.questionStatus;
					return quesStatus ? (
						<li
							key={i}
							className={currQ === num ? "current" : getQuestionClass(quesStatus)}
							onClick={() => {
								if (quesStatus !== QuestionStatus.NotVisited) {
									setCurrQ((bankPage - 1) * bankLength + i);
								}
							}}>
							{(bankPage - 1) * bankLength + i + 1}
						</li>
					) : (
						<li key={i}></li>
					);
				})}
			</div>
			<div className='btns'>
				{bankPage !== 1 ? (
					<button className='btn' onClick={() => setBankPage(bankPage - 1)}>
						<div className='ico prev-ico'>➤</div>
						<div className='name n-one'> Previous </div>
					</button>
				) : (
					<div className='vr' style={{ background: "#f81f3f" }}></div>
				)}
				{bankPage !== Math.ceil(questions.length / bankLength) ? (
					<button className='btn' onClick={() => setBankPage(bankPage + 1)}>
						<div className='name n-two'> Next </div>
						<div className='ico next-ico'>➤</div>
					</button>
				) : (
					<div className='vr' style={{ background: "#934bde" }}></div>
				)}
			</div>
		</>
	);
};

export const QuestionBank = () => {
	const { questions, bankLength } = useContext(QuizzContext);

	return (
		<div className='question-bank'>
			<h2>Question Bank</h2>
			{questions.length <= bankLength ? <FixedBank /> : <MoreBank />}
		</div>
	);
};

const Summary = memo(() => {
	return (
		<div className='summary'>
			<AnswerStatus />
			<QuestionBank />
		</div>
	);
});

export default Summary;
