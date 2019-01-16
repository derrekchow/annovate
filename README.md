# Annovate
A real-time collaborative annotation tool built on top of [Annotator](http://annotatorjs.org/). Allows students to provide insant feedback to their professor on course content on the web through the use of annotations.

  - Students add categorical annotations as they read course content on the web
  - Professors view all student annotations on a given piece of content at once and can immediatly gauge the class's reception to the content

### Installation
Navigate to `/private/annovate`:
```
npm install
```

To run and host Annovate locally, setup a MySQL server by following the instructions in [/annovate/resources/db.js](/annovate/resources/db.js) and modify the database credentials accordingly.

### Usage
Run Annovate without a database (only highlighting will work and changes will not be saved):
```
$ npm run nodb

> annovate@1.0.0 nodb ~/private/annovate
> ENABLE_DB=false node server.js

Server listening on localhost:3000
```

Run Annovate normally with a database:
```
$ npm run start

> annovate@1.0.0 start ~/private/annovate
> node server.js

Server listening on localhost:3000
CONNECTED TO MYSQL DATABASE
```

### Built with

* [Node.js] (server)
* [Express] (routing framework)
* [Annotate] (annotation library)
* [MySQL] (database)
* [Socket.IO] (real-time client/sever communication)
* [jQuery]

### License
----

See the [LICENSE](/annovate/LICENSE) file for details
