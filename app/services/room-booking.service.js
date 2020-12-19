let roomBookingModel = require('../models/room-booking-model');
let roomModel = require('../models/room.model');
let customerModel = require('../models/customer_model');
let roomBookingService = {
    addNewBooking: addNewBooking,
    bookingCheckout: bookingCheckout,
    bookingCheckIn: bookingCheckIn,
    getAllBookings: getAllBookings
}


function addNewBooking(bookingData) {
    return new Promise((resolve, reject) => {
        roomBookingModel.validateActiveBooking(bookingData).then((data0) => {
            if (data0 == 0) {
                roomModel.getRoomInfoById(bookingData).then((data1) => {
                    console.log(" =========== 1 ==============")
                    if (data1 == 0) {
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
                        roomBookingModel.getBookingInfo(bookingData).then((data) => {
                            console.log(" =========== 2 ==============")

                            if (data == 0) {
                                roomBookingModel.addNewBooking(bookingData).then((data2) => {
                                    console.log(" ======== 5 =========")
                                    let message = {
                                        "message": "BOOKING SUCCESSFULLY COMPLETED",
                                        "data": {
                                            "booking_id": data2.insertId,
                                            "db_response": data2
                                        }
                                    }
                                    resolve(message);
                                }).catch((error => {
                                    reject(error);
                                }))
                            } else {
                                let message = {
                                    "message": "BOOKING ALREADY EXISTS FOR THIS ROOM",
                                    "data": data
                                };
                                resolve(message);
                            }
                        }).catch((err) => {
                            reject(err);
                        });
                    }
                }).catch((errorbig) => {
                    reject(errorbig);
                });
            } else {
                let message = {
                    "message": "CUSTOMER ALREADY HAS BOOKING",
                    "data": {
                        "booking_id": data0[0].id,
                        "arrival": data0[0].arrival,
                        "checkout": data0[0].checkout
                    }
                }
                resolve(message);
            }

        }).catch((error_s_big) => {
            reject(error_s_big);
        });
      
    })
}

// phone, dueAmount 
function bookingCheckout (checkoutData) {
    return new Promise((resolve,reject) => {
        customerModel.getAllCustomerByIdentifier(checkoutData).then((data)=>{
            if(data == 0) {
                let message = {
                    "message": "CUSTOMER DOES NOT EXIST",
                    "data": data
                } ;
                resolve(message);
            } else {
                checkoutData.customerId = data[0].id;
                roomBookingModel.getBookingForCheckout(checkoutData).then((data2)=>{
                    if(data2 == 0) {
                        let message = {
                            "message": "THIS USER IS NOT CHECKED IN",
                            "data": data2
                        };
                        resolve(message);
                    } else {
                        if (data2[0].due_amount > checkoutData.dueAmount) {
                            let message = {
                                "message": "CUSTOMER OWES MORE AMOUNT TO THE HOTEL",
                                "data": {
                                    "booking_id": data2[0].id,
                                    "room_number": data2[0].room_number,
                                    "due_amount": (data2[0].due_amount - checkoutData.dueAmount)
                                }
                            };
                            resolve(message);
                            return;
                        }
                        data2[0].paidAmount = data2[0].paid_amount + data2[0].due_amount;
                        let checkoutInfo = data2[0];
                        roomBookingModel.roomCheckout(checkoutInfo).then((data3)=>{
                            let message = {
                                "message": "CUSTOMER SUCCESSFULLY CHECKED OUT",
                                "data": data3
                            };
                            resolve(message);
                        }).catch((error3)=>{
                            reject(error3);
                        });
                    }
                }).catch((error)=>{
                    reject(error);
                });
            }
        }).catch((err) => {
            reject(err);
        })
    })
}
// phone
function bookingCheckIn (checkinData) {
    return new Promise((resolve,reject) => {
        customerModel.getAllCustomerByIdentifier(checkinData).then((data)=>{
            if(data == 0) {
                let message = {
                    "message": "CUSTOMER DOES NOT EXIST",
                    "data": data
                } ;
                resolve(message);
            } else {
                checkinData.customerId = data[0].id;
                roomBookingModel.getBookingForCheckin(checkinData).then((data2)=>{
                    if(data2 == 0) {
                        let message = {
                            "message": "THIS CUSTOMER HAS NOT BOOKED ANY ROOM",
                            "data": data2
                        };
                        resolve(message);
                    } else {
                    
                        let checkinInfo = data2[0];
                        roomBookingModel.roomCheckin(checkinInfo).then((data3)=>{
                            let message = {
                                "message": "CUSTOMER SUCCESSFULLY CHECKED IN",
                                "data": data3
                            };
                            resolve(message);
                        }).catch((error3)=>{
                            reject(error3);
                        });
                    }
                }).catch((error)=>{
                    reject(error);
                });
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllBookings () {
    return new Promise((resolve,reject) => {
        roomBookingModel.getAllBookings().then((data)=>{
            let message = {
                "message": "ALL BOOKING DATA SUCCESSFULLY EXTRACTED",
                "data": data
            }
            resolve(message);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = roomBookingService;
