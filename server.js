const http = require("http");
const fs = require("fs");

let PORT = 8080;

function handleRequest(req, res) {
    let path = req.url;
    console.log(req.method);
    if(path === "/api/notes"){
        if (req.method === "GET"){
            // Saving the request data as a variable
            var requestData = "";

            // When the server receives data...
            req.on("data", function(data) {

            // Add it to requestData.
            requestData += data;
            });

            // When the request has ended...
            req.on("end", function() {

            // Log (server-side) the request method, as well as the data received!
            console.log("You did a", req.method, "with the data:\n", requestData);
            res.end();
            });
        }
    
        if (req.method === "POST"){
            // Saving the request data as a variable
            var requestData = "";

            // When the server receives data...
            req.on("data", function(data) {

            // Add it to requestData.
            requestData += data;
            });

            // When the request has ended...
            req.on("end", function() {

            // Log (server-side) the request method, as well as the data received!
            console.log("You did a", req.method, "with the data:\n", requestData);
            res.end();
            });
        }
        if (req.method === "DELETE"){
            // Saving the request data as a variable
            var requestData = "";

            // When the server receives data...
            req.on("data", function(data) {

            // Add it to requestData.
            requestData += data;
            });

            // When the request has ended...
            req.on("end", function() {

            // Log (server-side) the request method, as well as the data received!
            console.log("You did a", req.method, "with the data:\n", requestData);
            res.end();
            });
        }
    }
   
    switch (path) {
        case "/notes":
            return displayNotes(res);
        case "/":
            return displayIndex(res);
        default:
            return displayErr404(res);
    } 
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  
function displayNotes(res) {
    //Write out code to display notes.html
    fs.readFile(__dirname+"/public/notes.html", function(err, data){
        if (err)
            throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    })
}

function displayIndex(res) {
    //Write out code to display index.html
    fs.readFile(__dirname+"/public/index.html", function(err, data){
        if (err)
            throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    })
    
}

function displayErr404(res){
    //Write out code to display 404 page
    var myHTML = "<h1>404</h1>";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(myHTML);
}