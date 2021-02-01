class Customer {
    constructor(obj) {
        this.customerId = obj.customerId;
        this.name = obj.name;
        this.location = obj.location;
        this.purchaseDate = obj.purchaseDate;
        this.installationDate = obj.installationDate;
    }
}


module.exports = Customer