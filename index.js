const express = require("express");
const { paras } = require("express/lib/request");
var app = express();
const path = require("path");
var http = require("http").Server(app);
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public.index.html");
});

http.listen(port, () => {
    console.log("server listening to port ", port);
});

