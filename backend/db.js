const mongoose = require("mongoose");
// const mongoURI =
// 	"mongodb+srv://amitk161:Y1a9uurntxGITBBy@cluster0.a4fqdux.mongodb.net/foodManiaDB?retryWrites=true&w=majority";

const mongoURI =
	"mongodb://amitk161:Y1a9uurntxGITBBy@ac-8o9qdyd-shard-00-00.a4fqdux.mongodb.net:27017,ac-8o9qdyd-shard-00-01.a4fqdux.mongodb.net:27017,ac-8o9qdyd-shard-00-02.a4fqdux.mongodb.net:27017/foodManiaDB?ssl=true&replicaSet=atlas-10wd8m-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
	await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("connected");
			const fetched_data = mongoose.connection.db.collection("food_items");
			fetched_data.find({}).toArray(function (err, data) {
				const foodCategory = mongoose.connection.db.collection("foodCategory");
				foodCategory.find({}).toArray(function (err, catData) {
					if (err) {
						console.log(err);
					} else {
						global.food_items = data;
						global.foodCategory = catData;
					}
				});

				// if (err) {
				// 	console.log(err);
				// } else {
				// 	global.food_items = data;
				// }
			});
		}
	});
};

module.exports = mongoDB;
