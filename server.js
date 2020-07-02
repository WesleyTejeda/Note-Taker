var http = require("http");
var fs = require("fs");

var PORT = 8080;

function handleRequest(req, res) {
    var path = req.url;

    fs.readFile(__dirname+path, function(err, data){
        if (err)
            throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    })
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  