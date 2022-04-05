const express = require("express");
const index = require("express").Router();

const dbRouter = require("./notes");

const app = express();

app.use("/notes", dbRouter);

module.exports = app;
