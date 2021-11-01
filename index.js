const express = require("express")

const app = express()
const http = require("http")
const server = http.createServer(app)

const connection = require("./config/config")

const cors = require("cors")

const usersRouter = require("./controllers/users")

app.use(cors())

app.use(express.json())

connection.connect( (err) => {
    if (err) throw err

    console.log("Connected to database.")
})

app.get("/", (req, res) =>  {
    res.send("Welcome")
})

app.get("/create-table", (req, res) => {

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

app.use("/users", usersRouter)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown Endpoint" })
  }

app.use(unknownEndpoint)

const PORT = 3000
server.listen(PORT, () =>  {
    console.log(`Server listening on ${PORT}`)
})