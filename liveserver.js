var liveServer = require("live-server");

var params = {
    port: 8080,
    host: "0.0.0.0",
    open: true,
    file: "template.html",
    wait: 500
};

liveServer.start(params);