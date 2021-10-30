const express = require("express")

const app = express()
const http = require("http")
const server = http.createServer(app)

const cors = require("cors")

app.use(cors())

app.get("/", (req, res) =>  {
    res.send("Welcome")
})


const PORT = 3000
server.listen(PORT, () =>  {
    console.log(`Server listening on ${PORT}`)
})