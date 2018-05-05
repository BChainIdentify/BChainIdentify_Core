"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var api_1 = require("../api/api");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.middleWare(this.app);
        this.mountRoutes(this.app);
    }
    App.prototype.mountRoutes = function (app) {
        app.use('/api', api_1.Api.apiRoutes());
    };
    App.prototype.middleWare = function (app) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    };
    return App;
}());
exports.App = App;
