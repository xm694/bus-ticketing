const express = require('express');
const http = require('node:http');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares in use
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// endpoint router
app.get("/", (req, res) => {
    res.render("home")
})

const tripRouter = require("./src/routes/trip")
app.use("/trip", tripRouter);


// start server
app.listen(PORT, ()=> {
    console.log("Server running on port 3000.")
})

module.exports = app;


