const querystring = require('querystring')
const request = require('superagent')

const { CLIENT_ID, CLIENT_SECRET, SCOPE, AUTH_SITE } = process.env
const authService = AUTH_SITE || "https://auth.brightspace.com"
const authCodeEndpoint = authService + "/oauth2/auth"
const tokenEndpoint = authService + "/core/connect/token"
const getRedirectUri = function(req) { return "https://" + req.headers.host + "/auth/callback" }

exports.getToken = (req, cb) => {
	var authCodeParams = querystring.stringify({
	    response_type: 	"code",
	    redirect_uri: 	getRedirectUri(req),
	    client_id: 		CLIENT_ID,
	    scope: 			SCOPE,
	    state: 			"f4c269a0-4a69-43c1-9405-86209c896fa0"
	})
	cb(authCodeEndpoint + "?" + authCodeParams)
}

exports.saveToken = (req, cb) => {
	var payload = {
	    grant_type: 	"authorization_code",
	    redirect_uri: 	getRedirectUri(req),
	    code: 			req.query.code
	}

	request
    .post(tokenEndpoint)
    .auth(CLIENT_ID, CLIENT_SECRET)
    .type('form')
    .send(payload)
    .end((err, postResponse) => {
        if (err) {
            console.log('Access Token Error', err.response || err)
            res.redirect('/')
        } else {
        	cb(postResponse.body['access_token'])
        }
    })
}