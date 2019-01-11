// function updateTag(tag) {
//     return function () {
//         console.log('tag clicked')
//         var currentSelectedTag = tag.parent.querySelector("#selectedTag")
//         currentSelectedTag.removeAttr('id')
//         tag.attr('id', 'selectedTag')
//     }
// }

// var tag_btns = document.querySelectorAll("button.annotator-tag")
// console.log(`${tag_btns.length} tags`)
// for (var index = 0; index < tag_btns.length; ++index){
//     var tag_btn = tag_btns[index]
//     tag_btn.onclick = updateTag(tag_btn)
// }

// $('#clear').click(function(event){
    
// })

$(window).click(function(e) {
    var x = e.clientX,
        y = e.clientY,
        stack = [],
        elementMouseIsOver = document.elementFromPoint(x, y);
    
    stack.push(elementMouseIsOver);
    
    while (elementMouseIsOver.tagName !== 'HTML'){
        
        elementMouseIsOver.classList.add('pointerEventsNone');
        elementMouseIsOver = document.elementFromPoint(x, y);
        
        stack.push(elementMouseIsOver);
    }
    
    /* Now clean it up */
    var i  = 0,
        il = stack.length;
    
    for (; i < il; i += 1) {
        stack[i].classList.remove('pointerEventsNone');
    }
    
    console.log(stack);
});
