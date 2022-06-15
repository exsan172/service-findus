import moment from "moment-timezone"
import mongoose from "mongoose"

export const response = (res, code, message, data=null) => {
    let dataJson = {
        statusCode : code,
        message : message
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