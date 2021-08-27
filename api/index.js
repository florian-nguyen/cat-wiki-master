require("dotenv").config();
const axios = require("axios");

const baseUrl = "https://api.thecatapi.com/v1";

axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	headers: { "x-api-key": process.env.API_KEY },
});

module.exports = axiosInstance;
