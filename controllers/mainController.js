const axiosInstance = require("../api");
const db = require("../database");

module.exports = {
	homePage: (req, res) => {
		res.status(200).json({
			message: "Homepage endpoint",
		});
	},

	getAllBreeds: async (req, res) => {
		await axiosInstance
			.get("/breeds")
			.then((response) => res.json(response.data))
			.catch((error) => {
				console.log(error);
				res.status(500).json(error);
			});
	},

	getImagesForBreedId: async (req, res) => {
		await axiosInstance
			.get("/images/search", {
				params: {
					size: "thumb",
					limit: 8,
					breed_id: req.params.id,
				},
			})
			.then((response) => {
				res.json(response.data);
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json(error);
			});
	},

	getAllFavourites: async (req, res) => {
		await db.getAllFavourites()
			.then((response) => {
				res.json(response);
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json(error);
			});
	},

	updateFavourite: async (req, res) => {
		const { breedName, imageUrl } = req.body;

		console.log(req.body);

		await db.createOrUpdateFavourite(breedName, imageUrl)
			.then((response) => {
				res.json(response);
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json(error);
			});
	}
};
