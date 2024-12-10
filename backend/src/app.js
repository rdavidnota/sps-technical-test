const express = require("express");
const app = express();
const router = require("./routes");
const cors = require('cors');

app.use(cors());

// Middlewares
app.use(express.json());
app.use('/api', router);

module.exports = app;