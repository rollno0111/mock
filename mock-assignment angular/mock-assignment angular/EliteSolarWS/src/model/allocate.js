const connection = require('../utilities/connection');

let allocateDB = {}

allocateDB.generateId = async () => {
    let allocationModel = await connection.getAllocationData();
    let ids = await allocationModel.distinct("customer.customerId");
    let sId = Math.max(...ids);
    if(sId) return sId + 1;
    else return 1001;
}

allocateDB.allocateHeater = async (distName, customerObj) => {
    let allocationModel = await connection.getAllocationData();
    let newId = await allocateDB.generateId();
    customerObj.customerId = newId;
    let dataUpdated = await allocationModel.updateOne({ distributorName: distName }, { $push: { customer: customerObj } }, { runValidators: true })
    if (dataUpdated.nModified > 0) {
        return customerObj.customerId
    } else {
        let err = new Error('Allocation Failed')
        err.status = 500
        throw err;
    }
}

allocateDB.fetchDetails = async () => {
    let allocationModel = await connection.getAllocationData();
    let data = await allocationModel.find({}, { _id: 0, "customer._id": 0, "customer.customerId": 0, createdAt: 0, updatedAt: 0, __v: 0 })
    if (data.length > 0) {
        return data;
    } else {
        let err = new Error(`No data found`);
        err.status = 404
        throw err;
    }
}

module.exports = allocateDB;