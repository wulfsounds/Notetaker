const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all notes
notes.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST Route for a new note
notes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding Note');
    }
  });

//   // GET Route for retrieving the database
// notes.get('/api/db', (req, res) => {
//   console.info(`${req.method} request received for database`);

//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// });

// // POST Route for submitting database
// notes.post('/api/db', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to submit to database`);

//   // Destructuring assignment for the items in req.body
//   const { title, text } = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newDb = {
//       title,
//       text,
//       notes_id: uuid(),
//     };

//     readAndAppend(newDb, './db/db.json');

//     const response = {
//       status: 'success',
//       body: newDb,
//     };

//     res.json(response);
//   } else {
//     res.json('Error in posting feedback');
//   }
// });
  
  module.exports = notes;