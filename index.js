const axios = require('axios')
const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
    process.env.PORT != undefined
        ? console.log(`server at port ${process.env.PORT}`)
        : console.log('server at port 3333')
})
// Make a request for a user with a given ID
