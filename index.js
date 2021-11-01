const express = require("express")

const app = express()
const http = require("http")
const server = http.createServer(app)

const connection = require("./config/config")

const cors = require("cors")

const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const diaryEntriesRouter = require("./controllers/diaryEntries")

app.use(cors())

app.use(express.json())

connection.connect( (err) => {
    if (err) throw err

    console.log("Connected to database.")
})

app.get("/", (req, res) =>  {
    res.send("Welcome")
})

app.get("/create-table-users", (req, res) => {

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

    res.send("Table users created")
})

app.get("/create-table-entries", (req, res) => {

    const sql = `CREATE TABLE Diary_Entries (
        entryID int NOT NULL AUTO_INCREMENT,
        userID int NOT NULL, 
        date DATE NOT NULL, 
        tags varchar(255),
        text TEXT NOT NULL,
        PRIMARY KEY(entryID),
        FOREIGN KEY (userID) REFERENCES Users(userID)
        );`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Table Diary Entries created", result);
    })

    res.send("Table entries created")
})

app.use("/users", usersRouter)
app.use("/login", loginRouter)
app.use("/diary-entries", diaryEntriesRouter)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown Endpoint" })
  }

app.use(unknownEndpoint)

const PORT = 3000
server.listen(PORT, () =>  {
    console.log(`Server listening on ${PORT}`)
})