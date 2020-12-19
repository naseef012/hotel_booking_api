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
                console.log(" FOUND NO ROOOM ")
                resolve(message);
            } else {
                roomBookingModel.getBookingInfo(bookingData).then((data)=>{
                    if(data == 0) {
                        roomBookingModel.addNewBooking(bookingData).then((data2)=>{
                            resolve(data2);
                        }).catch((error => {
                            reject(error);
                        }))
                    } else {
                        let message = {
                            "message": "Booking ALREADY EXISTS",
                            "data": data
                        } ;
                        resolve(message);
                    }
                }).catch((err) => {
                    reject(err);
                })
            }
        }).catch((errorbig)=>{
            reject(errorbig);
        })

        // roomBookingModel.getBookingInfo(bookingData).then((data)=>{
        //     if(data == 0) {
        //         roomBookingModel.addNewBooking(bookingData).then((data2)=>{
        //             resolve(data2);
        //         }).catch((error => {
        //             reject(error);
        //         }))
        //     } else {
        //         let message = {
        //             "message": "Booking ALREADY EXISTS",
        //             "data": data
        //         } ;
        //         resolve(message);
        //     }
        // }).catch((err) => {
        //     reject(err);
        // })
    })
}

module.exports = roomBookingService;
