import moment from "moment-timezone"
import mongoose from "mongoose"

export const response = (res, code, message, data=null, errorCode=null) => {
    let dataJson = {
        statusCode : code,
        message : message
    }

    if(errorCode !== null) {
        dataJson['errorCode'] = errorCode
    }

    if(data !== null) {
        dataJson['data'] = data
    }

    return res.json(dataJson)
}

export const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME });
        console.log("Database connection success.")

    } catch(err) {
        console.log("Database connection failed.")
    }
}

export const curentTime = async () => {
    return await moment().tz("Asia/Jakarta").utc(true)
}

export const calcCrow = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d.toFixed(1);
}

// Converts numeric degrees to radians
const toRad = (Value) => {
    return Value * Math.PI / 180;
}