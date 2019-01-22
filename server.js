require('dotenv').load();
const express = require('express')
const app = express()
const Lti = require('./resources/lti')

const server = require('http').Server(app)
const port = process.env.PORT || 3000
const cookieName = 'application-data-api'

// Socket.IO
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const fs = require('fs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('cookie-parser')())

// serve different files depending on if db is enabled
app.get('/js/script.js', (req, res) => {
	if(process.env.ENABLE_DB == 'true') {
		res.sendFile(__dirname + '/public/js/script.js')
	}
	else {
		res.sendFile(__dirname + '/public/js/script_nodb.js')
	}
})

// serve static files from the /annovate/public folder
app.use(express.static('public'))
// establish routes to api to be called during annotation events
app.use('/api', require('./routes/api'))
// handle user authentication
app.use('/auth', require('./routes/auth'))

// send pages based on window url
app.get('/', (req, res) => {
	var cookie = req.cookies[cookieName]
	if(cookie == undefined || cookie.accessToken == undefined) {
		res.redirect('/auth/login')
	}
	else {
		var html = "<!DOCTYPE html><html><body>"
		fs.readdir('./public/examples', (err, files) => {
			for(var file of files) {
				if(file != '.DS_Store') {
					html += "<a class='d2l-btn' href='" + SERVER_URL + "/createQuicklink/" + file.replace(".html", "") + "'>" + file.replace(".html", "") + "</a>"
				}
			}
			html += "</body><style>.d2l-btn { background-color: #f9fafb; border-color: #d3d9e3; font-family: Lato,'Lucida Sans Unicode','Lucida Grande',sans-serif; border-radius: 0.3rem; border-style: solid; border-width: 1px; box-sizing: border-box; cursor: pointer; display: block; margin-top: 1rem; min-height: calc(2rem + 2px); outline: none; text-align: center; transition: 0.2s; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; vertical-align: middle !important; white-space: nowrap; width: 100%; position: relative; color: #006fbf !important; padding: 1rem; text-decoration: none; } .d2l-btn:hover { background-color:#e6eaf0; text-decoration: underline; }</style></html>"
			res.send(html)
		})
	}
})
app.get(['/page/:pageName', '/page/:pageName/admin'], (req, res) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})
app.get('/createQuicklink/:pageName', (req, res) => {
	Lti.createQuicklink(req, (lti_url) => {
		console.log("Quicklink created for page " + req.params['pageName'])
		res.redirect(lti_url)
	})
})
app.post('/page/:pageName', (req, res) => {
	var is_admin = ( req.body['roles'].search('urn:lti:instrole:ims/lis/Instructor') !== -1 ||
        req.body['roles'].search('urn:lti:instrole:ims/lis/Administrator') !== -1 )
	if(is_admin) {
		res.redirect('/page/' + req.params['pageName'] + "/admin")
	} else {
		res.redirect('/page/' + req.params['pageName'])
	}

})

// create WebSocket connection between server and client
io.on('connection', (socket) => {
	const page = socket.request.headers.referer.split('/')[4]
	socket.join(page)
	console.log('Socket CONNECTED from page `' + page + '`' + '\n')

	// when a change has been made on a page by a user
	socket.on('event', (page) => {
		// notify any admin pages
		io.to(page).emit('admin')
	}) 

	socket.on('disconnect', () => {
		socket.disconnect()
		console.log('Socket DISCONNECTED from page `' + page + '`' + '\n')
	})
})

// start HTTP server at localhost
server.listen(port, () => {
	console.log(`Server listening on localhost:${port}`)
})

