const express = require('express');
const index = require('express').Router();

const notesRouter = require('./notes');
const dbRouter = require('./db');

const app = express();

app.use('/notes', notesRouter);
app.use('/db', dbRouter);

module.exports = app