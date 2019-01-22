const lti = require('ims-lti')
const querystring = require('querystring')
const request = require('superagent')
const Auth = require('./auth')

const { HOST_URL, CLIENT_ID, CLIENT_SECRET, LTI_KEY, LTI_SECRET, SERVER_URL } = process.env
const nonceStore = new lti.Stores.MemoryStore();
const cookieName = 'application-data-api'
const provider = new lti.Provider(LTI_KEY, LTI_SECRET, nonceStore)
const launch_url = "https://d2llabs.desire2learn.com/d2l/lp/quicklinks/ext/create?ou=8400&parentNode=-1&pluginId=bc2e1ef0-7ae4-453d-a29b-12b30a3439fc"

exports.createQuicklink = (req, cb) => {
	console.log("GET REQUEST: " + req.url)
	var access_token = req.cookies[cookieName].accessToken
	var body = {
	    "Title": 				req.params['pageName'],
	    "Url": 					SERVER_URL + "/page/" + req.params['pageName'],
	    "Description": 			"",
	    "Key": 					CLIENT_ID,
	    "PlainSecret": 			CLIENT_SECRET,
	    "IsVisible": 			true,
	    "SignMessage": 			true,
	    "SignWithTc": 			false,
	    "SendTcInfo": 			true,
	    "SendContextInfo": 		true,
	    "SendUserId": 			true,
	    "SendUserName": 		true,
	    "SendUserEmail": 		false,
	    "SendLinkTitle": 		true,
	    "SendLinkDescription": 	false,
	    "SendD2LUserName": 		false,
	    "SendD2LOrgDefinedId": 	false,
	    "SendD2LOrgRoleId": 	false,
	    "CustomParameters": 	null
	}
	request
	.post(HOST_URL + "/d2l/api/le/1.3/lti/link/8400")
	.set('Authorization', `Bearer ${access_token}`)
	.type('json')
	.send(body)
	.end((err, postResponse) => {
		request
		.post(HOST_URL + "/d2l/api/le/1.3/lti/quicklink/8400/" + postResponse.body['LtiLinkId'])
		.set('Authorization', `Bearer ${access_token}`)
		.end((err, postResponse) => {
			var quicklink_url = HOST_URL + postResponse.body['PublicUrl'].replace("{orgUnitId}", "8400")
			var params = querystring.stringify({
			    quickLink: 		quicklink_url,
			    title: 			req.params['pageName'],
			    target: 		"newWindow",
			})
			cb(launch_url + "&" + params)
		})
	})
}

exports.validate = (req, cb) => {
	provider.valid_request(req, (err, is_valid) => {
		if(is_valid) {
			cb(true)
		}
		else {
			cb(err)
		}
	})
}