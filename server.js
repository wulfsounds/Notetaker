const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require("./routes/index");
const db = require("./db/db.json");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(clog);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.get("/", (req, res) => res.sendFile("Navigate to /notes or /routes"));
app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request method;
app.get("/api/notes", (req, res) => {
	console.log(db);
	return res.json(db);
});

// POST request method to add note;
app.post("/api/notes", (req, res) => {
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

app.get("*", (req, res) => res.send("File Not Found"));
app.listen(PORT, () =>
	console.log(`App listening at http://localhost:${PORT} 🚀`)
);
