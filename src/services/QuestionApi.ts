import axios from "axios";
import Question from "../oops/models/Question";

class QuestionApi {
	public static async AddQuesRequest(question: Question): Promise<number> {
		interface Response {
			status: number;
			message: string;
		}
		try {
			const response: Response = await axios.request({
				method: "post",
				maxBodyLength: Infinity,
				url: "https://devquizzer.onrender.com/admin/ques-req",
				headers: {
					"Content-Type": "application/json",
				},
				data: question.toString(),
			});
			return response.status;
		} catch (error) {
			return 500;
		}
	}
}

export default QuestionApi;
