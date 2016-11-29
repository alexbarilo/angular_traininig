/**
 * Created by dsk8 on 11/29/2016.
 */
var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db = new Db('tutor', new Server("localhost", 27017, {safe: true}, {auto_reconnect: true}, {}));

    db.open(function() {
        db.collection('notes', function(error, notes) {
            db.notes = notes;
        });
        console.log("Connection is opened");
    });



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));
app.listen(3000);

app.get("/greeting", function(req, res){
    res.send("Hello " + req.query.name + "!");
});
// app.get("/notes", function(req, res) {
//     res.send(req.session.notes||[]);
// });
// app.post("/notes", function(req, res) {
//     if (!req.session.notes) {
//         req.session.notes = [];
//         req.session.last_note_id = 0;
//     }
//     var note = req.body;
//     note.id = req.session.last_note_id;
//     req.session.last_note_id++;
//     req.session.notes.push(note);
//     res.end();
// });
// app.get("/notes", function(req,res) {
//     fs.readFile("notes.json", function(err, result) {
//         if (result) {
//             result = "" + result;
//             result = result.substring(0, result.length - 1);
//             result = "[" + result + "]";
//             result = result.split("\n").join(",");
//             res.send(result);
//         } else {
//             res.end();
//         }
//     });
// });
// app.post("/notes", function(req, res) {
//     var note = req.body;
//     var noteText = JSON.stringify(note)+"\n";
//     fs.appendFile("notes.json", noteText, function(err) {
//         if (err) {
//             console.log("something is wrong");
//         }
//         res.end();
//     });
// });

app.get("/notes", function(req, res) {
    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    })
})

app.post("/notes", function(req, res) {
    db.notes.insert(req.body);
    res.end();
});

app.delete("/notes", function(req,res) {
    var id = req.query.id;
    var notes = req.session.notes||[];
    var updatedNotesList = [];
    for (var i=0;i<notes.length;i++) {
        if (notes[i].id != id) {
            updatedNotesList.push(notes[i]);
        }
    }
    req.session.notes = updatedNotesList;
    res.end();
});

