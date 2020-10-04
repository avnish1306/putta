const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const port = process.env.PORT||8000;
const server = require("./routes/server");

// Middleware Setup
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static(__dirname+'/public'));


// Importing Routes
app.use("/server", server);
// Setting Up Error Messages and Status
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.sendFile(path.join(__dirname,'publics','404.html'));
});

// Starting the Server
app.listen(port, () => {
    console.log("Listening on port: "+port);
});
