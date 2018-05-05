"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app/app");
require('http').globalAgent.maxSockets = 5;
process.on('uncaughtException', function (err) {
    console.error(err.stack);
});
process.on('unhandledRejection', function (reason, p) {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    console.log("in process.on(unhandledRejection)");
});
var app = new app_1.App().app;
var port = 3003;
app.listen(port, 'localhost', function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("server is listening on " + port);
});
