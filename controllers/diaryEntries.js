const jwt = require("jsonwebtoken")
const diaryEntriesRouter = require("express").Router()
const db = require("../config/config")

const { body, validationResult } = require("express-validator")

const getTokenFrom = require("../utils/getTokenFrom")

diaryEntriesRouter.get("/", async (req, res) =>  {
    const token = getTokenFrom(req)

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ message: err })
        }

        const user = decodedToken
        const sql = 'SELECT * FROM Diary_Entries WHERE userID = ? ;'

        db.query(sql, [user.id ], (err, result) => {
            if (err) throw err

            return res.status(200).json(result)
        })
    })
})


diaryEntriesRouter.post("/",

    body("date", "Date needs to be a valid date of YYYY-MM-DD format").trim().isDate({ format: "YYYY-MM-DD" }),
    body("text", "More text required").trim().isLength({ min: 1 }).escape(),

    async (req, res) =>  {
        const { date, text } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }

        const token = getTokenFrom(req)

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ message: err })
            }

            const user = decodedToken
            const sql = 'INSERT INTO Diary_Entries (userID, date, text) VALUES (?, ?, ?);'

            db.query(sql, [user.id, date, text ], (err, result) => {
                if (err) throw err

                return res.json({ message: "Entry posted" })
            })
        })
})

diaryEntriesRouter.delete("/:id", async (req, res) => {

    const entryID = req.params.id

    const token = getTokenFrom(req)

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ message: err })
        }

        const sql = 'DELETE FROM Diary_Entries WHERE entryID = ? ;'

        db.query(sql, [entryID ], (err, result) => {
            if (err) throw err

            return res.json({ message: "Entry deleted" })
        })
    })
})

module.exports = diaryEntriesRouter