let allocateModel = require('../model/allocate')
let validator = require('../utilities/validator');

let allocateService = {}

allocateService.allocate = async (distName, customerObj) => {
    validator.validateCustomer(customerObj.name);
    validator.validateDate(customerObj.purchaseDate, customerObj.installationDate);
    validator.validateDistributor(distName);
    let customerId = await allocateModel.allocateHeater(distName, customerObj);
    return customerId;
}

allocateService.fetchDetails = async () => {
    let data = await allocateModel.fetchDetails();
    return data;
}

module.exports = allocateService;