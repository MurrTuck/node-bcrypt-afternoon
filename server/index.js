require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

app.use(express.json())
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
    })
);

app.post('/auth/register', authCtrl.register)

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db)
    console.log('Db mount up!')
    app.listen(SERVER_PORT, () => console.log(`Hitting Dingers on Port ${SERVER_PORT}`))
})
