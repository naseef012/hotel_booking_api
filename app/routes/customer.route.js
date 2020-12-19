const userService = require('../services/customer.service');
var schema = require('../schema/customerValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
// const { addNewCustomer } = require('../services/customer.service');


function init(router) {
    router.route('/customer')
        .post(addNewCustomer);
}
// router.route('/customer/:id')
// .get(getUserById)
// .delete(deleteUser)
// .put(updateUser); 

function addNewCustomer(req,res) {
    var userData=req.body;
    
    //Validating the input entity
     var json_format = iValidator.json_schema(schema.postSchema, userData, "user");
     if (json_format.valid == false) {
       return res.status(422).send(json_format.errorMessage);
     }
  
    userService.addNewCustomer(userData).then((data) => {
      res.json(data);
    }).catch((err) => {
      mail.mail(err);
      res.json(err);
    });
  
  }

  module.exports.init = init;
  