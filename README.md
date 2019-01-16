# Annovate ✍️ 💻 ✍️
A real-time collaborative annotation tool built on top of [Annotator]. Allows students to provide instant feedback to their professor on course content on the web through the use of annotations.

  - Students add categorical annotations as they read course content on the web
  - Professors view all student annotations on a given piece of content at once and can immediatly gauge the class's reception to the content

---
<br/>

![](/annovate/demo/comporg_video.gif)
### Left: Student using Annovate on module content
### Right: Professor viewing students' annotations in real time

---
<br/>

![](/annovate/demo/tree(prof).png)  |  ![](/annovate/demo/problem_set(prof).png)
:----------------------------------:|:-------------------------:

Annovate is intended to be used as an annotation tool inside D2L Brightspace as a way for users to prvoide feedback to their professors on module content, but can be used on any HTML document.

---

## Installation
Navigate to `/private/annovate`:
```
npm install
```
To run and host Annovate locally, setup a MySQL server by following the instructions in [/annovate/resources/db.js](/annovate/resources/db.js) and modify the database credentials accordingly.

## Usage
#### Run Annovate with a database (recommended):
```
$ npm run start

> annovate@1.0.0 start ~/private/annovate
> node server.js

Server listening on localhost:3000
CONNECTED TO MYSQL DATABASE
```

#### Run Annovate without a database (only highlighting will work and changes will not be saved):
```
$ npm run nodb

> annovate@1.0.0 nodb ~/private/annovate
> ENABLE_DB=false node server.js

Server listening on localhost:3000
```

## Built with
* [Node.js] (server)
* [Express] (routing framework)
* [Annotator] (JS annotation library)
* [MySQL] (database)
* [Socket.IO] (real-time client/sever communication)
* [jQuery]

## Authors
* [Matt Bonnell](https://github.com/mattbonnell) - Software Developer Co-op
* [Derrek Chow](https://github.com/derrekchow) - Software Developer Co-op

## License
See the [LICENSE](/annovate/LICENSE) file for details

[Node.js]: <https://nodejs.org/en/>
[Express]: <https://expressjs.com/>
[Annotator]: <http://annotatorjs.org/>
[MySQL]: <https://www.mysql.com/>
[Socket.IO]: <https://socket.io/>
[jQuery]: <https://jquery.com/>

