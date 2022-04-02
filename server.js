const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require("./routes/index");
const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(clog);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.get("/", (req, res) => res.sendFile("Navigate to /notes or /routes"));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

app.get("/api/notes", (req, res) => {
	res.json(db)
	const { title, text } = req.body;
	if (title && text) {
		const newNote = {title, text};
		const response = {
			status: 'Success',
			body: newNote
		};

		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json('Error in posting note')
	}
});

app.get("/api/notes/:title", (req, res) => {
	console.log(req.params);
	const requestedTitles = req.params.title.toLowerCase();
	const foundTitle = db.filter(
		(termObj) => termObj.term.toLowerCase() === requestedTitles
	)[0];
	console.log(foundTitle);
	if (requestedTerm === db[i].title.toLowerCase()) {return res.json(db[i])}
});

app.get("*", (req, res) => res.send("File Not Found"));

app.listen(PORT, () =>
	console.log(`App listening at http://localhost:${PORT} 🚀`)
);