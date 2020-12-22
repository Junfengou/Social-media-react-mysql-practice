//connection to the data on the global level
const mysql = require("mysql");
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "10prestige",
	database: "socialmedia",
});

module.exports = db;
