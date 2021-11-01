const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginRouter = require("express").Router()
const db = require("../config/config")

loginRouter.post("/", async (req, res) => {
    console.log("LOGIN", req.body)
    const { username, password } = req.body

    const sql = 'SELECT userID, username, password FROM Users WHERE username = ?'

    db.query(sql, [username], async (err, result) => {
        if (err) throw err

        console.log("RES", result)
        const user = result[0]

        if(!user) {
            res.status(401).json({ message: "Username or password incorrect" })
        }
        else if (user.username === username) {

            const correctPassword = await bcrypt.compare(password, user.password)
            
            if(correctPassword) {

                const userForToken = {
                    username: user.username,
                    id: user.userID
                }

                const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: "2h" })

                res.status(200).json({ token, user: user.username })
            }
            else {
                res.status(401).json({ message: "Username or password incorrect" })
            }
        }

    })

})

module.exports = loginRouter