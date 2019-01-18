var auth = { "Authorization", "Bearer " + access_token }

var hostname_url = ""
$.ajax(
    type: "POST",
    url: hostname_url + "/d2l/api/le/1.3/lti/link/8400",
    headers: auth,
    data:

)
.then(function(data){
   return $.ajax(
        type: "POST"
        headers: auth,
        url: hostname_url + "/d2l/api/le/1.3/lti/quicklink/8400/" + data['LtiLinkId']
        data: 
   ) //second ajax call
})
.then(function(){
   return $.ajax(
        type: "POST"
        headers: auth
        url: hostname_url + "/d2l/api/le/1.3/8400/content/modules/{module_id}/structure/"
   ) //third ajax call
})
.done(function(resp){
   //handle final response here
 })