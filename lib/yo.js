var request = require('request');

var Yo = function(token) {
    if (!token) {
        throw new Error("Token is needed to make an api call");
    }

    this.base = "http://api.justyo.co";
    this.token = token;
};

module.exports = Yo;

Yo.prototype.yoAll = function(callback) {
    request.post(this.base + "/yoall/", {
        form: {
            api_token: this.token
        }
    }, callback);
};


Yo.prototype.yo = function(username, callback) {
    request.post(this.base + "/yo/", {
        form: {
            username: username,
            api_token: this.token
        }
    }, callback);
};

Yo.prototype.countOfSubscribers = function(callback) {
    request.get(this.base + "/subscribers_count/", {
        qs: {
            api_token: this.token
        }
    }, callback);
};