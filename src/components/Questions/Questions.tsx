import { memo, useContext, useEffect } from "react";
import { FlagFill, Star, StarFill, XCircleFill } from "react-bootstrap-icons";
import "./Questions.scss";
import { QuizzContext } from "../../context/QuizContext";
import { QuestionStatus } from "../../oops/enum/QuestionStatus";
import { Link } from "react-router-dom";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Questions = memo(() => {
	const { currQ, questions, setQuestions, myAns, setMyAns, submit } = useContext(QuizzContext);

	useEffect(() => {
		if (questions[currQ].questionStatus === QuestionStatus.NotVisited) {
			const updatedQuestions = [...questions];
			updatedQuestions[currQ].questionStatus = QuestionStatus.NotAnswered;
			setQuestions(updatedQuestions);
		}
	}, [currQ, questions]);

	const SubmittedOption = memo(
		({ option, isCorrect, isSelected }: { option: string; isCorrect: boolean; isSelected: boolean }) => (
			<div className={`option ${isCorrect ? "correct" : isSelected ? "incorrect" : ""}`}>
				{option}
				{isCorrect && isSelected && <FontAwesomeIcon icon={faCircleCheck} className='true-mark' />}
				{!isCorrect && isSelected && <FontAwesomeIcon icon={faCircleXmark} className='false-mark' />}
				{isCorrect && !isSelected && <FontAwesomeIcon icon={faCircleCheck} className='true-mark' />}
			</div>
		)
	);

	return (
		<div className='questions'>
			<div className='details'>
				<div className='name'>
					<div className='number'>Q{currQ + 1}.</div>
					<div className='ques' style={{ whiteSpace: "pre" }}>
						{questions[currQ].ques}
					</div>
					{questions[currQ].linkedIn !== "dummy" && (
						<div className='linkedin-id'>
							<div className='contri'>Contributed By</div>
							<Link to={""} className='id'>
								@{questions[currQ].linkedIn}
							</Link>
						</div>
					)}
				</div>
				{!submit && (
					<div className='options'>
						{questions[currQ].options.map((option: string, i: number) => (
							<div
								key={i}
								className={`option ${myAns[currQ] === i + 1 ? "selected" : null}`}
								onClick={() => {
									setMyAns((prevAns) => {
										const updatedAns = [...prevAns];
										if (updatedAns[currQ] === i+1) {
											updatedAns[currQ] = -1;
											questions[currQ].questionStatus = QuestionStatus.NotAnswered;
										} else {
											updatedAns[currQ] = i + 1;
											questions[currQ].questionStatus = QuestionStatus.Answered;
										}
										return updatedAns;
									});
								}}>
								{option}
							</div>
						))}
					</div>
				)}
				{submit && (
					<div className='options'>
						{questions[currQ].options.map((option: string, i: number) => (
							<SubmittedOption
								key={i}
								option={option}
								isCorrect={questions[currQ].answer === i + 1}
								isSelected={myAns[currQ] === i + 1}
							/>
						))}
					</div>
				)}
			</div>
			<div className='extra-btns'>
				{!submit && (
					<button
						type='button'
						className='mark'
						onClick={() => {
							const updatedQuestions = [...questions];
							if (updatedQuestions[currQ].questionStatus !== QuestionStatus.MarkForReview) {
								updatedQuestions[currQ].questionStatus = QuestionStatus.MarkForReview;
							} else {
								updatedQuestions[currQ].questionStatus =
									myAns[currQ] !== -1 ? QuestionStatus.Answered : QuestionStatus.NotAnswered;
							}
							setQuestions(updatedQuestions);
						}}>
						{questions[currQ].questionStatus === QuestionStatus.MarkForReview ? (
							<StarFill className='marked extra-icon' />
						) : (
							<Star className='not-marked extra-icon' />
						)}

						<span>
							{questions[currQ].questionStatus === QuestionStatus.MarkForReview ? "Marked" : "Mark"} for
							Review
						</span>
					</button>
				)}
				{!submit && (
					<button
						type='button'
						className='clear'
						onClick={() => {
							questions[currQ].questionStatus = QuestionStatus.NotAnswered;
							setMyAns((prevAns) => {
								const updatedAns = [...prevAns];
								updatedAns[currQ] = -1;
								return updatedAns;
							});
						}}>
						<XCircleFill />
						<span>Clear</span>
					</button>
				)}
				{submit && <button type='button' className='report'>
					{/* //TODO: Implement dialog box */}
					<FlagFill />
					<span>Report</span>
				</button>}
			</div>
		</div>
	);
});

export default Questions;
