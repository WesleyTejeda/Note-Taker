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
const app = express();
var path = require('path');
let PORT = 8080;
const router = express.Router();

router.use((req, res, next) => {
    next();
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.use(router);

app.listen(PORT);