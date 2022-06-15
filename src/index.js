import env from 'dotenv'
import express from "express";
import morgan from 'morgan';
import path from 'path'

import { DatabaseConnection, response } from './config'
import AccountRoutes from './routes/account.routes.js'
import AuthRoute from './routes/auth.routes.js'
import ChatRoute from './routes/chat.routes.js'
import FindRoute from './routes/find.routes.js'

env.config()
DatabaseConnection()
morgan('dev')

const app   = express()
const port  = process.env.PORT || 3000 

app.use("/assets", express.static(path.join(__dirname, 'assets')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/account", AccountRoutes)
app.use("/auth", AuthRoute)
app.use("/chat", ChatRoute)
app.use("/find", FindRoute)

// 404 handle
app.use((req, res) => {
    response(res, 404, "address not found !")
});

app.listen(port, () => {
    console.log("App running on port " +port+ "!");
})