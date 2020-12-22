const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/User");
app.use("/user", userRoute);

const uploadRoute = require("./routes/Upload");
app.use("/upload", uploadRoute);

app.listen(5000, (req, res) => {
	console.log("Server have started");
});

//code below just use to test connection
{
	/** 
 app.get("/register", (req, res) => {
 	db.query(
 		"INSERT INTO Users (username, password) VALUES ('Jun' , 'game')",
 		(err, results) => {
 			console.log(err);
 			res.send(results);
 		}
 	);
 });
*/
}
