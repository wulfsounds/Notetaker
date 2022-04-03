const db = require("express").Router();

// POST request method to add note;
db.post("/api/notes", (req, res) => {
	let response;
	const { title, text } = req.body;
	if (title && text) {
		const newNote = { title, text };
		response = {
			status: "Success",
			body: newNote,
		};
		readAndAppend(newNote, "./db/db.json");
		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json("Error in posting note");
	}
});

db.post("/notes", (req, res) => {
	let response;
	const { title, text } = req.body;
	if (title && text) {
		const newNote = { title, text };
		response = {
			status: "Success",
			body: newNote,
		};
		readAndAppend(newNote, "./db/db.json");
		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json("Error in posting note");
	}
});

module.exports = db;
