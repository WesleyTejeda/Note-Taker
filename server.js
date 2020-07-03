// const http = require("http");
// const fs = require("fs");

// let PORT = 8080;

// function handleRequest(req, res) {
//     let path = req.url;
//     console.log(req.method);
//     if(path === "/api/notes"){
//         if (req.method === "GET"){

//         }
    
//         if (req.method === "POST"){
    
//         }
//         if (req.method === "DELETE"){
            
//         }
//     }
   
//     switch (path) {
//         case "/notes":
//             return displayNotes(res);
//         case "/":
//             return displayIndex(res);
//         default:
//             return displayErr404(res);
//     } 
// }

// var server = http.createServer(handleRequest);

// server.listen(PORT, function() {
//     console.log("Server listening on: http://localhost:" + PORT);
//   });
  
// function displayNotes(res) {
//     //Write out code to display notes.html
//     fs.readFile(__dirname+"/public/notes.html", function(err, data){
//         if (err)
//             throw err;
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(data);
//     })
// }

// function displayIndex(res) {
//     //Write out code to display index.html
//     fs.readFile(__dirname+"/public/index.html", function(err, data){
//         if (err)
//             throw err;
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(data);
//     })
    
// }

// function displayErr404(res){
//     //Write out code to display 404 page
//     var myHTML = "<h1>404</h1>";
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(myHTML);
// }
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require('path');
const router = express.Router();
let PORT = 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// router.use((req, res, next) => {
//     next();
// })


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

//Returns JSON 
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname + '/db/db.json'));
});

app.post("/api/notes", (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
    };
    fs.readFile(__dirname+'/db/db.json', 'utf-8', (err, data) => {
        if (err)
            res.status(500).json({message: "File not found."});
        let oldJson = JSON.parse(data);
        console.log(oldJson[0], typeof(oldJson));
        oldJson.push(newNote);

        fs.writeFile(__dirname+'/db/db.json', JSON.stringify(oldJson), (err) => {
            if (err)
                res.status(500).json({message: "Error."});
            res.status(200).json({message: "Successful"}); 
        })
    })
});

// app.use(router);

app.listen(PORT);