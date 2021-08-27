const path = require("path");
const express = require("express");
const mainController = require("./controllers/mainController");
const router = express.Router();

// router.get("/", mainController.homePage);

router.route("/breeds").get(mainController.getAllBreeds); // List all breeds
// .post(mainController.getBreedByName); // Get breed by name

router.route("/images/:id").get(mainController.getImagesForBreedId);

router.route("/favourites")
	.get(mainController.getAllFavourites)
	.post(mainController.updateFavourite);

router.get("(/*)?", async (req, res, next) => {
	res.sendFile(
		path.join(
			path.normalize(path.join(__dirname, "./client/build")),
			"index.html",
		),
	);
});

module.exports = router;
