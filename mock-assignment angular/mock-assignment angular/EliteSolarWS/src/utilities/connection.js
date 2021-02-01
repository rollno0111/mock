const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const customerSchema = Schema({
    customerId: { type: Number, required: true },
    name: String,
    purchaseDate: { type: Date, default: new Date() },
    installationDate: { type: Date, default: new Date() },
    location: String
})

const allocationSchema = Schema({
    solarHeaterId: { type: Number, required: true, unique: true },
    distributorName: String,
    customer: { type: [customerSchema], default: [] }
}, { collection: "Allocation" })

let collection = {};

const EliteSolarDBURL = "mongodb://localhost:27017/EliteSolarDB";

let connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

collection.getAllocationData = async () => {
    try {
        let database = await mongoose.connect(EliteSolarDBURL, connectionOptions);
        let allocationModel = await database.model('Allocation', allocationSchema);
        return allocationModel
    } catch (error) {
        let err = new Error("Could not connect to database");
        err.status = 500;
        throw err;
    }
}

module.exports = collection; 