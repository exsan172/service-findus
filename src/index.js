import express from "express";

const app   = express()
const port  = process.env.PORT || 3000 
app.get("/", () => {
    res.send("sat")
})

app.listen(port, () => {
    console.log("App running on port " +port+ "!");
})