var express = require('express');
var routing = express.Router();
var allocateService = require('../service/allocate')
var Customer = require('../model/customer')
var parser = require("../parser").reportGenerator
const path = require("path")
const fs = require("fs")

routing.put('/allocate/:distributor', async (req, res, next) => {
    try {
        let assign = new Customer(req.body);
        let customerId = await allocateService.allocate(req.params.distributor, assign);
        res.json({ "message": "Solar Heater " + req.params.distributor + " successfully allocated to customer " + customerId })
    } catch (err) {
        next(err)
    }
})

routing.get('/solarheater', async (req, res, next) => {
    try {
        let data = await allocateService.fetchDetails();
        res.json(data)
    } catch (err) {
        next(err)
    }
})

routing.get("/dashboard", (req, res, next) => {
    let data = fs.readFileSync(path.join(__dirname, "../model/solarheater.json"), "utf8")
    res.json(JSON.parse(data))
})

routing.get("/test", async (req, res, next) => {
    try {
        let data = await parser();
        console.log("--- Evaluation Completed ---");
        res.send(data)
    } catch (err) {
        next(err);
    }
})


module.exports = routing;