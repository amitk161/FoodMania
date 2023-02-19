const express = require("express");
const router = express.Router();

router.get("/foodData", (req, res) => {
	try {
		console.log(global.food_items);
		console.log(global.foodCategory);
		res.send([global.food_items, global.foodCategory]);
	} catch (err) {
		console.error(err);
		res.send("Server Error");
	}
});

module.exports = router;
