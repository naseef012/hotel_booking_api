var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

let roomBookingModel = {
    addNewBooking: addNewBooking,
    getBookingInfo: getBookingInfo
}
// customerPhone, roomId, roomNumber, arrivalTime, checkoutTime, paymentAmount
// paymentType, customerId
function addNewBooking (booking) {
    return new Promise((resolve, reject)=>{
        let sql = "INSERT INTO tb_bookings (room_number, customer_id,arrival, checkout, paid_amount, payment_type, status) VALUES (?,?,?,?,?,?,1)";
        let params = [booking.roomNumber, booking.customerId, booking.arrivalTime, booking.checkoutTime, booking.paymentAmount, booking.paymentType];
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
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_bookings WHERE (room_number = ?) AND ((? BETWEEN arrival AND checkout) OR (? BETWEEN arrival AND checkout) OR (arrival BETWEEN ? AND ?) AND status = 1) ";

        let params = [booking.roomNumber, booking.arrivalTime, booking.checkoutTime, booking.arrivalTime, booking.checkoutTime,];
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

module.exports = roomBookingModel;



// SELECT * FROM tb_bookings WHERE (room_number = 301) AND 
// (
//     ('2020-12-23 06:00:00' BETWEEN arrival AND checkout)
// OR 
// 	('2020-12-26 06:00:00' BETWEEN arrival AND checkout)
// )
// OR 
// (
//    (arrival BETWEEN '2020-12-23 06:00:00' AND '2020-12-26 06:00:00') 
// )
// AND 
// status = 1