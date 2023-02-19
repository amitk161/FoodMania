const mongoose = require("mongoose");
require("dotenv").config();

const mongo_uri = process.env.mongoURI;
const mongoDB = async () => {
	await mongoose.connect(
		mongo_uri,
		{
			useNewUrlParser: true,
		},
		(err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("connected");
				const fetched_data = mongoose.connection.db.collection("food_items");
				fetched_data.find({}).toArray(function (err, data) {
					const foodCategory =
						mongoose.connection.db.collection("foodCategory");
					foodCategory.find({}).toArray(function (err, catData) {
						if (err) {
							console.log(err);
						} else {
							global.food_items = data;
							global.foodCategory = catData;
						}
					});
				});
			}
		}
	);
};

module.exports = mongoDB;
