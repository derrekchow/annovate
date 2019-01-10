const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
 	extended: true
}));

app.use(require('./controllers'))
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.sendFile('public')
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

module.exports = app



