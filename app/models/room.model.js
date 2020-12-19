var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

let roomInfo = {
    getRoomInfoById: getRoomInfoById
}

function getRoomInfoById (roomData) {
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM tb_rooms WHERE (room_number = ? AND max_persons >= ?)";
        let params = [roomData.roomNumber, roomData.maxPersons];
        db.query(sql,params,(errors,rows,fields)=>{
            if(!!errors) {
                dbFunc.connectionRelease;
                reject(errors);
            } else {
                if(rows.length == 0) {
                    dbFunc.connectionRelease;
                    resolve(0);
                }
                dbFunc.connectionRelease;
                resolve(rows);
            }
        })
    });
}

module.exports = roomInfo;

