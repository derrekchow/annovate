var pageUri = function () {
    return {
        beforeAnnotationCreated: function (ann) {
            ann.uri = window.location.href;
        }
    };
};

var app = new annotator.App();

app.include(annotator.storage.http, {
	prefix: '/api'
});

app
.include(annotator.ui.main, {
    editorExtensions: [annotator.ui.tags.editorExtension],
    viewerExtensions: [
        annotator.ui.tags.viewerExtension
    ]
});

app.start()
.then(() => {
	app.annotations.load()
	$("#test").load("./examples/index.html")
})
