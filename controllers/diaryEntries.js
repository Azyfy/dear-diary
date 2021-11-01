const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const diaryEntriesRouter = require("express").Router()
const db = require("../config/config")


const getTokenFrom = req => {  
    const auth = req.get('Authorization')  
    if (auth && auth.toLowerCase().startsWith('bearer ')) {    
        return auth.substring(7)
    }  
    
    return null
}

diaryEntriesRouter.get("/", async (req, res) =>  {
    const token = getTokenFrom(req)

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({message: err})
        }

        const user = decodedToken
        const sql = 'SELECT * FROM Diary_Entries WHERE userID = ? ;'

        db.query(sql, [user.id ], (err, result) => {
            if (err) throw err
    
            console.log("Got Entry", result);
    
            return res.status(200).json(result)
        })

    })

})


diaryEntriesRouter.post("/", async (req, res) =>  {
    const {date, tags, text} = req.body
    console.log("BODY", req.body)
    const token = getTokenFrom(req)

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({message: err})
        }
        console.log("TOKEN", decodedToken)

        const user = decodedToken
        const sql = 'INSERT INTO Diary_Entries (userID, date, tags, text) VALUES (?, ?, ?, ?);'

        db.query(sql, [user.id, date, tags, text ], (err, result) => {
            if (err) throw err
    
            console.log("Entry created", result);
    
            return res.json({message: "Entry posted"})
        })

    })


})

module.exports = diaryEntriesRouter