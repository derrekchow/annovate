var pageUri = function () {
    return {
        beforeAnnotationCreated: function (ann) {
            ann.uri = window.location.href;
        }
    };
};

var app = new annotator.App();
app
.include(annotator.ui.main, {
    editorExtensions: [annotator.ui.tags.editorExtension],
    viewerExtensions: [
        annotator.ui.markdown.viewerExtension,
        annotator.ui.tags.viewerExtension
    ]
})
.include(annotator.storage.http, {
        prefix: "/api",
        urls: {
            create: '/annotations',
            update: '/annotations/{id}',
            destroy: '/annotations/{id}',
            search: '/search'
        },
})
.include(pageUri)

app
.start()
.then(function () {
    app.annotations.load({})
});