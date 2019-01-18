const express = require('express')
const router = express.Router()

const querystring = require('querystring')
const request = require('superagent')

const authService = process.env.AUTH_SITE || "https://auth.brightspace.com"
const authCodeEndpoint = authService + "/oauth2/auth"
const tokenEndpoint = authService + "/core/connect/token"
const getRedirectUri = function(req) { return "https://" + req.headers.host + "/auth/callback" }

const cookieName = "application-data-api-demo"
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
}

// launch point for LTI remote plugin in Brightspace
router.post('/login', (req, res) => {

	// Authorization Request: https://tools.ietf.org/html/rfc6749#section-4.1.1
	var authCodeParams = querystring.stringify({
	    response_type: "code",
	    redirect_uri: getRedirectUri(req),
	    client_id: process.env.CLIENT_ID,
	    scope: process.env.SCOPE,
	    // Generate a secure state in production to prevent CSRF (https://tools.ietf.org/html/rfc6749#section-10.12)
	    state: "f4c269a0-4a69-43c1-9405-86209c896fa0"
	})

	res.redirect(authCodeEndpoint + "?" + authCodeParams)
})

router.get('/callback', function(req, res) {
    // Authorization Response: https://tools.ietf.org/html/rfc6749#section-4.1.2
    // Validate req.query.state before continuing in production to prevent CSRF (https://tools.ietf.org/html/rfc6749#section-10.12)
    var authorizationCode = req.query.code

    // Access Token Request: https://tools.ietf.org/html/rfc6749#section-4.1.3
    var payload = {
        grant_type: "authorization_code",
        redirect_uri: getRedirectUri(req),
        code: authorizationCode
    }

    request
        .post(tokenEndpoint)
        // Authenticate via HTTP Basic authentication scheme: https://tools.ietf.org/html/rfc6749#section-2.3.1
        .auth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
        // Using application/x-www-form-urlencoded as per https://tools.ietf.org/html/rfc6749#section-4.1.3
        .type('form')
        .send(payload)
        .end(function(err, postResponse) {
            if (err) {
                console.log('Access Token Error', err.response || err)
                res.redirect('/')
            } else {
                // Access Token Response: https://tools.ietf.org/html/rfc6749#section-4.1.4
                // We are storing the access token in a cookie for simplicity, but the user agent should never have to see it
                res.cookie(cookieName, { accessToken: postResponse.body.access_token }, cookieOptions)
                console.log(postResponse.body.access_token)
                // Optionally, store the refresh token (postResponse.body.refresh_token) to a user context (https://tools.ietf.org/html/rfc6749#section-6)
                res.redirect('/')
            }
        })
})

router.get('/data', function(req, res) {
	var access_token = req.cookies[cookieName].accessToken
    request
        .get(process.env.HOST_URL + '/d2l/api/lp/1.10/users/whoami')
        .set('Authorization', `Bearer ${access_token}`)
        .end(function(error, response) {
            if (error) {
                var errorMessage = JSON.stringify(error, null, 2)
                console.log(errorMessage)
                res.send(`<pre>${errorMessage}</pre>`)
            } else {
                res.json(response.text)
            }
        })
})

module.exports = router