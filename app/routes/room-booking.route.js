const roomBookingService = require('../services/room-booking.service');
var schema = require('../schema/roomValidationScheme.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


function init(router) {
    router.route('/book')
    .post(addNewBooking)
}

function addNewBooking(req,res) {
    var bookingData=req.body;
    
    // Validating the input entity
    //  var json_format = iValidator.json_schema(schema.postSchema, bookingData, "user");
    //  if (json_format.valid == false) {
    //    return res.status(422).send(json_format.errorMessage);
    //  }
  
    roomBookingService.addNewBooking(bookingData).then((data) => {
      res.json(data);
    }).catch((err) => {
      mail.mail(err);
      res.json(err);
    });
  
  }

module.exports.init = init;