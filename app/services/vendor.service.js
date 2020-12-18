const { getAllVendors } = require('../models/vendor-model');
let vendorModel = require('../models/vendor-model');

let vendorService = {
    getAllVendors: getAllVendors
}

module.exports = vendorService;