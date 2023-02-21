const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/getlocation", async (req, res) => {
	try {
		let lat = req.body.latlong.lat;
		let long = req.body.latlong.long;
		console.log(lat, long);
		let location = await axios
			.get(
				"https://api.opencagedata.com/geocode/v1/json?q=" +
					lat +
					"+" +
					long +
					`&key=${process.env.KEY}`
			)
			.then(async (res) => {
				// console.log(`statusCode: ${res.status}`)
				console.log(res.data.results);
				// let response = stringify(res)
				// response = await JSON.parse(response)
				let response = res.data.results[0].components;
				console.log(response);
				let { village, county, state_district, state, postcode } = response;
				return String(
					village +
						"," +
						county +
						"," +
						state_district +
						"," +
						state +
						"\n" +
						postcode
				);
			})
			.catch((error) => {
				console.error(error);
			});
		res.send({ location });
	} catch (error) {
		console.error(error.message);
		res.send("Server Error");
	}
});

module.exports = router;
