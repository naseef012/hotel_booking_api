// const { getAllVendors } = require('../models/vendor-model');
let customerModel = require('../models/customer_model');

let customerService = {
    addNewCustomer: addNewCustomer
}

function addNewCustomer(userData) {
    return new Promise((resolve,reject) => {
        customerModel.addNewCustomer(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

module.exports = customerService;