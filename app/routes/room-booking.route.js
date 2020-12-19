const roomBookingService = require('../services/room-booking.service');
var schema = require('../schema/roomValidationScheme.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


function init(router) {
  router.route('/book')
    .post(addNewBooking);
  router.route('/checkout')
    .post(bookingCheckout);
  router.route('/checkin')
    .post(bookingCheckin);

}

function addNewBooking(req, res) {
  var bookingData = req.body;

  // Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, bookingData, "user");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  roomBookingService.addNewBooking(bookingData).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}

function bookingCheckout(req, res) {
  var checkoutData = req.body;

  // Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, checkoutData, "user");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  roomBookingService.bookingCheckout(checkoutData).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}

function bookingCheckin(req, res) {
  var checkinData = req.body;

  // Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, checkinData, "user");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  roomBookingService.bookingCheckIn(checkinData).then((data) => {
    res.json(data);
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}

module.exports.init = init;


// SELECT * FROM tb_bookings WHERE (room_number = 401) 
// AND 
// (
//     ('2021-04-01 08:00:00' BETWEEN arrival AND checkout) 
//     OR 
//     ('2021-04-02 06:00:00' BETWEEN arrival AND checkout) 
//     OR 
//     (arrival BETWEEN '2021-04-01 08:00:00' AND '2021-04-02 06:00:00') 
    
// )
// AND 
//     status IN (1,3) ORDER BY `id`  DESC