const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/errorlogger');
const myRequestLogger = require('./utilities/requestlogger');
const setupdb = require("./model/dbsetup")
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(myRequestLogger);
app.use('/', router);
app.use(myErrorLogger);

app.get('/setupdb', async (req, res, next) => {
    try {
        let data = await setupdb();
        res.send(data);
    } catch (err) {
        next(err);
    }
})

app.listen(2040);
console.log("Server listening in port 2040");

module.exports = app;