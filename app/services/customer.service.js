// const { getAllVendors } = require('../models/vendor-model');
let customerModel = require('../models/customer_model');

let customerService = {
    addNewCustomer: addNewCustomer
}

function addNewCustomer(userData) {
    return new Promise((resolve,reject) => {
        customerModel.getAllCustomerByIdentifier(userData).then((data)=>{
            if(data == 0) {
                customerModel.addNewCustomer(userData).then((data2)=>{
                    resolve(data2);
                }).catch((error => {
                    reject(error);
                }))
            } else {
                let message = {
                    "message": "USER ALREADY EXISTS",
                    "data": data
                } ;
                resolve(message);
            }
        }).catch((err) => {
            reject(err);
        })
    })
   
}

module.exports = customerService;