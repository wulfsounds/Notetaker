const { readFromFile, writeToFile } = require("../helpers/fsUtils");

const notes = require("express").Router();

// POST request method to add note;
notes.post("/api/notes", (req, res) => {
	let response;
	const { title, text } = req.body;
	if (title && text) {
		const newNote = { title, text };
		response = {
			status: "Success",
			body: newNote,
		};
		readAndAppend(newNote, "./db/notes.json");
		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json("Error in posting note");
	}
});

// Post request to page 
notes.post("/notes", (req, res) => {
	let response;
	const { title, text } = req.body;
	if (title && text) {
		const newNote = { title, text };
		response = {
			status: "Success",
			body: newNote,
		};
		readAndAppend(newNote, "./db/notes.json");
		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json("Error in posting note");
	}
});

// //DELETE route for specific note
// notes.delete('/:note_id', (req, res) => {
// 	const noteId = req.params.note_id;
// 	readFromFile('./db/notes.json')
// 		.then((data) => JSON.parse(data))
// 		.then(json) {
// 			const result = json.filter((notes) => notes.note_id !== noteId);

// 			writeToFile('./db/notes.json', result);

// 			res.json(`Item ${noteId} has been deleted 🗑`);
// 		};
// })



module.exports = notes;
