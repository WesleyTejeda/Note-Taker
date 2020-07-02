var http = require("http");
var fs = require("fs");

var PORT = 8080;

function handleRequest(req, res) {
    var path = req.url;

    if (req.method == 'POST') {
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

    if (req.method == 'GET') {
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

    if (req.method == 'DELETE') {
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
    
    switch (path) {
        case "/notes":
            return displayNotes();
        case "*":
            return displayIndex();
        default:
            return displayErr404();
    } 
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  
function displayNotes() {
    //Write out code to display notes.html
}

function displayIndex() {
    //Write out code to display index.html
}

function displayErr404(){
    //Write out code to display 404 page
}