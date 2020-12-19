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

function roomCheckout(checkoutInfo) {

}

module.exports = roomBookingModel;