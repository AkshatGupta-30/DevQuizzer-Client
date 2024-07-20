import { AxiosError } from "axios";

function handleAxiosError(error: AxiosError): string {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		const { data } = error.response as { data: { message: string } };
		return data.message;
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		return "Error in connecting to server";
	}
	// Something happened in setting up the request that triggered an Error
	return "Internal Server Error";
}

export default handleAxiosError;
