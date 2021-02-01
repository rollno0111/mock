const fs = require('fs');

const errorLogger = (err, req, res, next) => {
    fs.appendFile('./ErrorLogger.txt', new Date() + " - " + err.stack + "\n", (error) => {
        if (error) {
            console.log("Failed in logging error");
        } else {
            if (err.status) res.status(err.status)
            else res.status(500);
            res.json({ "message": err.message })
            next();
        }
    });
}

module.exports = errorLogger;