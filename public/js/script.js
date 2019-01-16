var socket = io();
var url_global = window.location.pathname.split('/');

// client establishes WebSocket connection with the server
socket.on('connect', function() {
    console.log("Socket connection established")
})
socket.on('disconnect', function() {
    console.log("Socket connection lost")
})

// generates a random id for the user
function guid() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
	    .toString(16)
	    .substring(1);
	}
	return s4() + s4() + s4();
}
  
// before an annotation is sent to the server, add the page and uid to the annotation to be sent
var addIds = function () {
    return {
        beforeAnnotationCreated: function (ann) {
            ann.page = window.location.pathname.split('/')[2];
            ann.uid = window.localStorage.getItem('userId');
        }
    };
};

function elementsAtLocation (x,y){
    var stack= [], el;
    do {
        el = document.elementFromPoint(x, y);
        stack.push(el);
        el.classList.add('pointerEventsNone');
    }while(el.tagName == 'SPAN');

    // clean up
    for(var i  = 0; i < stack.length; i += 1)
        stack[i].classList.remove('pointerEventsNone');
    return stack;
}

// initialize Annotator and include extenstions
var app = new annotator.App();
app.include(annotator.storage.http, {
       prefix: '/api'
});
app.include(annotator.ui.main, {
    viewerExtensions: [
        annotator.ui.tags.viewerExtension,
    ]
});
app.include(addIds);

// on app start
app.start()
.then(() => {
    // if student
    if(url_global[3] == "" || url_global[3] == undefined) {
        console.log("User ID: ", window.localStorage.getItem('userId'));
        if(window.localStorage.getItem('userId') == null) {
            window.localStorage.setItem('userId', guid());
        }
        app.annotations.load({ page: url_global[2], uid: window.localStorage.getItem('userId') });
    }
    else { // if admin
        // if a change has been made by a user on the page
        socket.on('admin', function() {
            console.log("New annotation created for page " + url_global[2]);
            app.annotations.load({ page: url_global[2] })
            
            // remove highlights before reloading
            var b = document.getElementsByClassName('annotator-hl');
            while(b.length) {
                var parent = b[ 0 ].parentNode;
                while( b[ 0 ].firstChild ) {
                    parent.insertBefore(  b[ 0 ].firstChild, b[ 0 ] );
                }

                parent.removeChild( b[ 0 ] );
            }
        })
        app.annotations.load({ page: url_global[2] });
    }
})
