import { Fragment, memo, useContext, useEffect, useMemo, useState } from "react";
import { QuizzContext } from "../../context/QuizContext";
import "./QuestionPanel.scss";
import Questions from "../Questions/Questions";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Watermark = () => (
	<div className='watermark-wrapper'>
		{Array.from({ length: 12 }, (_, i: number) => (
			<Fragment key={i}>
				<div className='watermark'>DevQuizzer DevQuizzer DevQuizzer</div>
				<div className='watermark'>&nbsp;&nbsp;&nbsp;DevQuizzer DevQuizzer&nbsp;&nbsp;&nbsp;</div>
			</Fragment>
		))}
	</div>
);

const Timer = memo(() => {
	const { startQuiz, submit } = useContext(QuizzContext);
	const [time, setTime] = useState<number>(0);

	useEffect(() => {
		if (startQuiz) {
			const startTime = Date.now();
			let animationFrameId: number;

			const updateTimer = () => {
				if (submit) {
					cancelAnimationFrame(animationFrameId);
					return;
				}
				setTime(Date.now() - startTime);
				animationFrameId = requestAnimationFrame(updateTimer);
			};

			animationFrameId = requestAnimationFrame(updateTimer);

			return () => {
				cancelAnimationFrame(animationFrameId);
			};
		}
	}, [startQuiz, submit]);

	const formattedTime: string = useMemo(() => {
		const hours = String(Math.floor((time / 3600000) % 60)).padStart(2, "0");
		const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, "0");
		const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	}, [time]);

	return (
		<div className='timer-wrapper'>
			<div className='timer'>{submit ? "Time Taken" : "Timer"}&nbsp;-&nbsp;</div>
			<div className='numbers'>
				<span className='digits'>{formattedTime}</span>
			</div>
		</div>
	);
});

const HeadWrapper = memo(() => {
	const { category } = useContext(QuizzContext);

	return (
		<div className='head-wrapper'>
			<div className='title'>
				<div className='logo' style={{ color: category.color }}>
					<img src={category.image} alt='Logo' />
					{category.name}
				</div>
			</div>
			<Timer />
		</div>
	);
});

const StartQuiz = memo(() => {
	const { questions, setCurrQ, setStartQuiz } = useContext(QuizzContext);

	return (
		<div className='start-quiz'>
			<div className='start-box'>
				<button
					className='start'
					onClick={() => {
						setCurrQ(0);
						setStartQuiz(true);
					}}>
					Start Quiz
				</button>
				<div className='no-of-ques'>{questions.length} Questions</div>
			</div>
		</div>
	);
});

const Submit = memo(() => {
	const { setCheckSubmit, setSubmit } = useContext(QuizzContext);

	return (
		<div className='submit-quiz'>
			<div className='sure-label'>Are you sure you want to Submit?</div>
			<div className='submit-box'>
				<button className='cancel' onClick={() => setCheckSubmit(false)}>
					Cancel
				</button>
				<button className='submit' onClick={() => setSubmit(true)}>
					Submit
				</button>
			</div>
		</div>
	);
});

const FootWrapper = memo(() => {
	const { currQ, setCurrQ, questions, bankPage, setBankPage, bankLength, checkSubmit, setCheckSubmit, submit } =
		useContext(QuizzContext);
	const navigate = useNavigate();

	return (
		<div className='foot-wrapper'>
			{currQ && !checkSubmit ? (
				<button
					className='nav-btns'
					onClick={() => {
						if (!checkSubmit) {
							if (currQ === (bankPage - 1) * bankLength) {
								setBankPage(bankPage - 1);
							}
							setCurrQ(currQ - 1);
						} else {
							setCheckSubmit(false);
						}
					}}>
					<FontAwesomeIcon icon={faChevronLeft} />
					{!checkSubmit ? "Previous Question" : "Back"}
				</button>
			) : (
				<div></div>
			)}
			{!checkSubmit && (
				<button
					className='nav-btns'
					onClick={() => {
						if (currQ < questions.length - 1) {
							if (currQ + 1 === bankPage * bankLength) {
								setBankPage(bankPage + 1);
							}
							setCurrQ(currQ + 1);
						} else {
							if (submit) {
								navigate(-1);
							}
							setCheckSubmit(true);
						}
					}}>
					{currQ < questions.length - 1 ? "Next Question" : submit ? "Exit" : "Submit"}
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			)}
		</div>
	);
});

const QuestionPanel = memo(() => {
	const { startQuiz, checkSubmit, currQ, submit, correct } = useContext(QuizzContext);

	return (
		<div className={`question-panel ${submit ? (correct[currQ] ? "correct" : "incorrect") : null}`}>
			<Watermark />
			<HeadWrapper />
			{!startQuiz && <StartQuiz />}
			{startQuiz && !checkSubmit && <Questions />}
			{checkSubmit && <Submit />}
			{startQuiz && <FootWrapper />}
		</div>
	);
});

export default QuestionPanel;
