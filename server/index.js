const express = require('express')
const app = express()
const connection = require('./database')
const routes = require('./routes/index.router')

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({extended: false}))

routes(app)

app.listen(PORT, () => {
    console.log(`SERVER UP AT PORT ${PORT}`)
})
