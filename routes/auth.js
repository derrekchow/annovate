const express = require('express')
const router = express.Router()

const Lti = require('../resources/lti')
const Auth = require('../resources/auth')

const { LTI_KEY, LTI_SECRET } = process.env

const cookieName = 'application-data-api'

// launch point for LTI remote plugin in Brightspace
router.post('/login', (req, res) => {
	Auth.getToken(req, (oauth_login_url) => {
		res.redirect(oauth_login_url)
	})
})

router.get('/callback', function(req, res) {
	Auth.saveToken(req, (token) => {
		res.cookie(cookieName, { accessToken: token })
		res.redirect('/')
	})
})

module.exports = router