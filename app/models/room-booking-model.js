var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

let roomBookingModel = {
    addNewBooking: addNewBooking,
    getBookingInfo: getBookingInfo,
    getBookingForCheckout: getBookingForCheckout,
    getBookingForCheckin: getBookingForCheckin,
    roomCheckin: roomCheckin,
    roomCheckout: roomCheckout,
    getAllBookings: getAllBookings,
    validateActiveBooking: validateActiveBooking
}
// customerPhone, roomId, roomNumber, arrivalTime, checkoutTime, paymentAmount
// paymentType, customerId
function addNewBooking (booking) {
    return new Promise((resolve, reject)=>{
        let sql = "INSERT INTO tb_bookings (room_number, customer_id,arrival, checkout, paid_amount, payment_type, status, due_amount) VALUES (?,?,?,?,?,?,1,?)";
        let params = [booking.roomNumber, booking.customerId, booking.arrivalTime, booking.checkoutTime, booking.paymentAmount, booking.paymentType, booking.dueAmount];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                dbFunc.connectionRelease;
                resolve(rows)   ;
            }
        })
    });
}
// arrivalTime, checkoutTime, roomNumber
// this function returns the list of bookings existing in the same period
function getBookingInfo(booking) {
    console.log(" =========== 3 ==============")

    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_bookings WHERE (room_number = ?) AND ((? BETWEEN arrival AND checkout) OR (? BETWEEN arrival AND checkout) OR (arrival BETWEEN ? AND ?)) AND status IN (1,3) ";

        let params = [booking.roomNumber, booking.arrivalTime, booking.checkoutTime, booking.arrivalTime, booking.checkoutTime,];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                if (rows.length == 0) {
                    resolve(0);
                    return;
                }
                dbFunc.connectionRelease;
                resolve(rows);
            }
        })
    });
}
// customerId
function getBookingForCheckout(checkoutData) {
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_bookings WHERE customer_id = ? AND status = 3 ";
        let params = [checkoutData.customerId];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                if (rows.length == 0) {
                    resolve(0);
                }
                dbFunc.connectionRelease;
                resolve(rows);
            }
        })
    });
}
// customerId
function getBookingForCheckin(checkoutData) {
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_bookings WHERE customer_id = ? AND status = 1";
        let params = [checkoutData.customerId];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                if (rows.length == 0) {
                    resolve(0);
                }
                dbFunc.connectionRelease;
                resolve(rows);
            }
        })
    });
}
// id, paidAmount
function roomCheckout(bookingId) {
    return new Promise((resolve, reject)=>{
        let sql = "UPDATE tb_bookings SET status = 2, due_amount = 0, paid_amount =?, payment_type = 2 WHERE id = ?";
        let params = [bookingId.paidAmount,bookingId.id];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                if (rows.length == 0) {
                    resolve(0);
                }
                dbFunc.connectionRelease;
                resolve(rows);
            }
        })
    });

}
// id
function roomCheckin(bookingId) {
    console.log(" ============= HELO FROM roomCheckout ========= "+JSON.stringify(bookingId));
    return new Promise((resolve, reject)=>{
        let sql = "UPDATE tb_bookings SET status = 3 WHERE id = ?";
        let params = [bookingId.id];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        })
    });

}

function getAllBookings() {
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_bookings";
        let params = [];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                if (rows.length == 0) {
                    resolve(0);
                }
                dbFunc.connectionRelease;
                resolve(rows);
            }
        })
    }); 
}

function validateActiveBooking (bookingInfo) {
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_bookings WHERE customer_id = ? AND status IN (1,3)";
        let params = [bookingInfo.customerId];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                if (rows.length == 0) {
                    resolve(0);
                }
                dbFunc.connectionRelease;
                resolve(rows);
            }
        })
    });
}


module.exports = roomBookingModel;