let roomBookingModel = require('../models/room-booking-model');
let roomModel = require('../models/room.model');
let roomBookingService = {
    addNewBooking: addNewBooking
}


function addNewBooking (bookingData) {
    return new Promise((resolve,reject) => {
        roomModel.getRoomInfoById(bookingData).then((data1) => {
            if(data1 == 0) {
                let message = {
                    "message": "NO ROOM EXISTS BASED ON GIVEN SPECIFICATIONS",
                    "data": data1
                };
                resolve(message);
            } else {
                let paymentAmount = bookingData.paymentAmount;
                let paymentType = 0;
                let dueAmount = data1[0].price - paymentAmount;
                if (dueAmount > 0) {
                    paymentType = 1;
                } else if (dueAmount == 0) {
                    paymentType = 2;
                } else {
                    let message = {
                        "message": "PAID AMOUNT IS MORE THAN THE PRICE OF THE ROOM",
                        "data": []
                    };
                    resolve(message);
                    return;
                }
                bookingData.paymentType = paymentType;
                bookingData.dueAmount = dueAmount;
                roomBookingModel.getBookingInfo(bookingData).then((data)=>{
                    if(data == 0) {
                        roomBookingModel.addNewBooking(bookingData).then((data2)=>{
                            resolve(data2);
                        }).catch((error => {
                            reject(error);
                        }))
                    } else {
                        let message = {
                            "message": "BOOKING ALREADY EXISTS",
                            "data": data
                        } ;
                        resolve(message);
                    }
                }).catch((err) => {
                    reject(err);
                });
            }
        }).catch((errorbig)=>{
            reject(errorbig);
        });
    })
}

module.exports = roomBookingService;
