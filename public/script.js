var app = new annotator.App();
app.include(annotator.ui.main, {
    editorExtensions: [annotator.ui.tags.editorExtension],
    viewerExtensions: [
        annotator.ui.markdown.viewerExtension,
        annotator.ui.tags.viewerExtension
    ]
});
app.include(annotator.storage.debug);

app.start();