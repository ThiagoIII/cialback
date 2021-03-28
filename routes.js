const express = require('express')
const FetchController = require('./controllers/FetchController')
var fs = require('fs')

const router = express.Router()
router.get('/', function (req, res) {
    fs.readFile('searchHistory.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(400).json('error trying to read from local file')
        }
        console.log('data', data)
        return res.status(200).json(data)
    })
    return
})
router.post('/fetchQuery', FetchController.getIndex)
router.post('/fetchQueryPost', FetchController.postIndex)

module.exports = router
