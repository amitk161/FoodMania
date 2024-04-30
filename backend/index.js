const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || process.env.PORTNO;
const frontURL = process.env.FRONT_URL;
const mongoDB = require("./db");
mongoDB();

app.use(cors(
	{
        origin: "https://food-mania-frontend.vercel.app",
        methods: ["POST", "GET"],
        credentials: true,
    }
))

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/GeoLocation"));

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
