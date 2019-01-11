function updateTag(tag) {
    return function () {
        console.log('tag clicked')
        var currentSelectedTag = tag.parent.querySelector("#selectedTag")
        currentSelectedTag.removeAttr('id')
        tag.attr('id', 'selectedTag')
    }
}

var tag_btns = document.querySelectorAll("button.annotator-tag")
console.log(`${tag_btns.length} tags`)
for (var index = 0; index < tag_btns.length; ++index){
    var tag_btn = tag_btns[index]
    tag_btn.onclick = updateTag(tag_btn)
}

$('#clear').click(function(event){
    
})
