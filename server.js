var express = require("express");

var app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/images", express.static(__dirname + "/public/images"));
app.get("/", function(req, res) {
    res.sendfile("suche.html");
});

var server = app.listen(8000, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});