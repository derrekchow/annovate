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
	res.redirect('/page/index')
})

app.get('/page/:pageName', (req, res) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})

app.get('/page/:pageName/admin', (req, res) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

module.exports = app



