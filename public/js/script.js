function guid() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
	    .toString(16)
	    .substring(1);
	}
	return s4() + s4() + s4();
}
  

var pageUri = function () {
    return {
        beforeAnnotationCreated: function (ann) {
            ann.page = window.location.pathname.split('/')[2];
        }
    };
};

var userId = function () {
    return {
        beforeAnnotationCreated: function (ann) {
            var userId = window.localStorage.getItem('userId');
            ann.uid = userId;
        }
    }
}

var app = new annotator.App();

app.include(annotator.storage.http, {
    prefix: '/api'
});

app.include(annotator.ui.main, {
    viewerExtensions: [
        annotator.ui.tags.viewerExtension
    ]
});

app.include(pageUri).include(userId);


app.start()
.then(() => {
    var url = window.location.pathname.split('/');

    if(url[3] == "" || url[3] == undefined) {
        console.log("User ID: ", window.localStorage.getItem('userId'));
        if(window.localStorage.getItem('userId') == null) {
            window.localStorage.setItem('userId', guid());
        }
        app.annotations.load({ page: url[2], uid: window.localStorage.getItem('userId') });
    }
    else {
        app.annotations.load({ page: url[2] });
    }
})
