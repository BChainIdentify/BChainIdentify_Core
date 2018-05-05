"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.apiRoutes = function () {
        this.router.post('/addUser', function (req, res) {
            /*
            hash(BN)
            public key
            signHash
            */
        });
        this.router.get('/userExists', function (req, res) {
            /*
            hash(BN)
            message
            signedMessage
            */
        });
        return this.router;
    };
    Api.router = express_1.Router();
    return Api;
}());
exports.Api = Api;
