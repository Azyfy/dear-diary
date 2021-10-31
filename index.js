const express = require("express")

const app = express()
const http = require("http")
const server = http.createServer(app)

const mysql = require("mysql2")

require('dotenv').config()

const cors = require("cors")

app.use(cors())

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

connection.connect( (err) => {
    if (err) throw err

    console.log("Connected to database.")
})

app.get("/", (req, res) =>  {
    res.send("Welcome")
})

app.get("/crete-table", (req, res) => {

    const sql = `CREATE TABLE Users (
        userID int NOT NULL AUTO_INCREMENT, 
        username varchar(255) NOT NULL, 
        password varchar(255) NOT NULL,
        PRIMARY KEY(userID)
        );`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Table created", result);
    })

    res.send("Table created")
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown Endpoint" })
  }

app.use(unknownEndpoint)

const PORT = 3000
server.listen(PORT, () =>  {
    console.log(`Server listening on ${PORT}`)
})