var db = require('../../config/database');
var dbFunc = require('../../config/db-function');


let customer_model = {
    addNewCustomer: addNewCustomer,
    getAllCustomerByIdentifier: getAllCustomerByIdentifier
}
// fname, lname, email, phone
function addNewCustomer (user) {
    return new Promise((resolve, reject)=>{
        let sql = "INSERT INTO tb_customers (first_name, last_name, email, phone) VALUES (?,?,?,?)";
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

function getAllCustomerByIdentifier (user) {
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_customers WHERE (phone LIKE '%"+user.phone+"%') ";
        let params = [];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                if(rows.length == 0) {
                    resolve(0);
                }
                dbFunc.connectionRelease;
                resolve(rows)   ;
            }
        })
    });
}

module.exports = customer_model;