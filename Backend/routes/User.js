const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ?  : stand for whatever is input from the server from the client side

// in order to access the front end to grab information, create a variable like this  [ const username = req.body.username;]

router.post("/register", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		"INSERT INTO Users (username, password) VALUES (? , ?);",
		[username, password],
		(err, results) => {
			console.log(err);
			res.send(results);
		}
	);
});

router.post("/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		"SELECT * FROM Users WHERE username = ?", //if the username in the database match the username input in the frontend
		username,
		(err, results) => {
			if (err) {
				console.log(err);
			}
			// if there is such user
			if (results.length > 0) {
				//Since it will return in an array form, grab the password in the first index and compare it to the input password being passed in from the front end
				if (password == results[0].password) {
					res.json({ loggedIn: true, username: username });
					// res.send("You are logged in");
				} else {
					// res.send("Wrong username or password");
					res.json({ loggedIn: false, message: "Wrong username or password" });
				}
			} else {
				// res.send("User doesn't exist");
				res.json({ loggedIn: false, message: "User doesn't exist" });
			}
		}
	);
});

module.exports = router;

{
	/** 
router.get("/register", (req, res) => {
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
