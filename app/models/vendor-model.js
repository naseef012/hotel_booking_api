var db = require('../../config/database');
var dbFunc = require('../../config/db-function');


let vendor_model = {
    getAllVendors: getAllVendors,
    addNewVendors: addNewVendors
}

let getAllVendors = () => {
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM vendor";
        let params = [];
        db.query(sql,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows)   ;
            }
        })
    });
}

module.exports = vendor_model;