var db = require('../../config/database');
var dbFunc = require('../../config/db-function');


let customer_model = {
    addNewCustomer: addNewCustomer,
    getAllCustomer: getAllCustomer
}
// fname, lname, email, phone
let addNewCustomer = (user) => {
    return new Promise((resolve, reject)=>{
        let sql = "INSERT INTO tb_customer (first_name, last_name, email, phone) VALUES (?,?,?,?)";
        let params = [user.fname, user.lname, user.email, user.phone];
        db.query(sql,params,(errors,rows,fields)=>{
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

let getAllCustomer = () => {
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_customer";
        let params = [];
        db.query(sql,params,(errors,rows,fields)=>{
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