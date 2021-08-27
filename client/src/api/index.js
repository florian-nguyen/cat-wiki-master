const baseUrl =
	process.env.NODE_ENV === "production"
		? "/api/v1"
        : `http://localhost:${process.env.PORT || 5000}/api/v1`;

export default baseUrl;
