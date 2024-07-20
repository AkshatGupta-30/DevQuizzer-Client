import { QuesReqContextInterface } from "../../context/QuestionRequestContext";
import { QuestionStatus } from "../enum/QuestionStatus";
import { DifficultyType, getDifficulty } from "../enum/Types";

class Question {
	id: string;
	categoryId: string;
	ques: string;
	options: string[];
	answer: number;
	difficulty: DifficultyType;
	explanation: string;
	linkedIn: string;
	questionStatus: QuestionStatus;

	constructor(params: {
		id: string;
		categoryId: string;
		ques: string;
		options: string[];
		answer: number;
		difficulty: DifficultyType;
		explaination: string;
		linkedIn: string;
	}) {
		this.id = params.id;
		this.categoryId = params.categoryId;
		this.ques = params.ques;
		this.options = params.options;
		this.answer = params.answer;
		this.difficulty = params.difficulty;
		this.explanation = params.explaination;
		this.linkedIn = params.linkedIn;
		this.questionStatus = QuestionStatus.NotVisited;
	}

	public static factoryList(data: any): Question[] {
		const questions: Question[] = [];
		data.results.forEach((res: any) => {
			questions.push(
				new Question({
					answer: res.answer,
					categoryId: res.categoryID,
					difficulty: getDifficulty(res.difficulty),
					explaination: res.explanation,
					id: res.id,
					linkedIn: res.linkedIn,
					options: res.options,
					ques: res.ques,
				})
			);
		});
		return questions;
	}

	public toString(): string {
		return JSON.stringify({
			categoryID: this.categoryId,
			ques: JSON.stringify(this.ques),
			options: this.options,
			answer: this.answer,
			explanation: this.explanation,
			difficulty: this.difficulty.toString(),
			linkedIn: this.linkedIn,
		});
	}

	public static addQues(data: QuesReqContextInterface["ques"]): Question {
		return new Question({
			id: "",
			answer: data.answer,
			categoryId: data.category,
			difficulty: getDifficulty(data.difficulty),
			explaination: data.explaination,
			linkedIn: data.linkedIn,
			options: [data.option1, data.option2, data.option3, data.option4],
			ques: data.question,
		});
	}

	public static empty(): Question {
		return new Question({
			id: "",
			answer: 0,
			categoryId: "",
			difficulty: DifficultyType.Easy,
			explaination: "",
			linkedIn: "",
			options: [],
			ques: "",
		});
	}
}

export default Question;
