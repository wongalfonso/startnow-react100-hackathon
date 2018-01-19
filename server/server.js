const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.static("dist"));
app.use(express.static("public"));

module.exports = app;

