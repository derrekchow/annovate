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
            ann.uri = window.location.pathname.split('/')[2]
        }
    };
};

var userId = function () {
    return {
        beforeAnnotationCreated: function (ann) {
            var userId = window.localStorage.getItem('userId');
            if (!userId){
                userId = guid();
                window.localStorage.setItem('userId', userId);
            }
            ann.uid = userId;
        }
    }
}

var app = new annotator.App();

// app.include(annotator.storage.http, {
// 	prefix: '/api'
// });
app.include(annotator.storage.debug);
app
.include(annotator.ui.main, {
    viewerExtensions: [
        annotator.ui.tags.viewerExtension
    ]
});

app.include(pageUri).include(userId);

app.start()
.then(() => {
	app.annotations.load({uid: window.localStorage.getItem('userId')})
	$("#test").load("./examples/index.html")
})
