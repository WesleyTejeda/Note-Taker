const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require('path');
let PORT = process.env.PORT || 8080;
const app = express();
app.listen(PORT);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname + '/db/db.json'));
});

app.post("/api/notes", (req, res) => {
    let id = 0;
    fs.readFile(__dirname+'/db/db.json', 'utf-8', (err, data) => {
        if (err)
            res.status(500).json({message: "File not found."});
        let oldJson = JSON.parse(data);
        let newNote = {
            title: req.body.title,
            text: req.body.text,
        };
        oldJson.push(newNote);
        oldJson.forEach(object => {
            object.id = id;
            id++;
        })
        fs.writeFile(__dirname+'/db/db.json', JSON.stringify(oldJson), (err) => {
            if (err)
                res.status(500).json({message: "Error."});
            res.status(200).json({message: "Successful"}); 
        })
    })
});

app.delete("/api/notes/:id", (req, res) => {
    //req.params = {id: ~};
    let objToDel;
    fs.readFile(__dirname+'/db/db.json', 'utf-8', (err, data) => {
        if (err)
            res.status(500).json({message: "File not found."});
        let oldJson = JSON.parse(data);
        oldJson.forEach(object => {
            console.log(object);
            if(object.id == req.params.id)
                objToDel = object;
        });
        let indexDel = oldJson.indexOf(objToDel);
        if(indexDel === 0)
            oldJson.shift();
        else oldJson.splice(indexDel, 1);
        fs.writeFile(__dirname+'/db/db.json', JSON.stringify(oldJson), (err) => {
            if (err)
                res.status(500).json({message: "Error."});
            res.status(200).json({message: "Successful"}); 
        })
    });
})