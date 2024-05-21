const getApiConfig = () => {
	let convoAiMetricsApiUrl;
	if (process.env.ENV === "development") {
		convoAiMetricsApiUrl = "http://localhost:5000";
	} else {
		convoAiMetricsApiUrl = "https://convoaimetrics.simpletalk.ai";
	}

	return { convoAiMetricsApiUrl };
};

export default getApiConfig;
