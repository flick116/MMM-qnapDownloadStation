'use strict';

/* Magic Mirror
 * Module: MMM-Hive
 *
 * By Stuart McNally
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var request = require('request');

var U = require("./getSid.js");

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},

	getData: function() {
		var self = this;
		
        var qnap = this.config.qnapServer;
		var lUrl = this.config.loginUrl;
        var qUrl = this.config.queryUrl;
        var sessionID;
        
        var fromNo = this.config.fromNo;
        var limit = this.config.limit;
        var type = this.config.type;
        var status = this.config.status;
        
        var username = this.config.username;
        var password = U.ezEncode(U.utf16to8(this.config.password));
        
            
		request({
			url: qnap + lUrl,
			method: 'POST',
            formData: {
                        user: username,
                        pass: password
                       },
		}, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.error != 1) {
                var responseJson = JSON.parse(body);
				sessionID = responseJson.sid;
			}
            else {
				self.sendSocketNotification("ERROR", body);
			}

		request({
			url: qnap + qUrl,
			method: 'POST',
            formData: {
                        from: fromNo,
                        limit: limit,
                        type: type,
                        status: status,
                        sid: sessionID
                       },
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {                               
				self.sendSocketNotification("DATA", body);                
			}
            else if (response.statusCode == 404) {
				self.sendSocketNotification("ERROR404", body);
			}
            else {
				self.sendSocketNotification("ERROR", body);
			}
		})
		});

		setTimeout(function() { self.getData(); }, this.config.refreshInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.sendSocketNotification("STARTED", true);
			self.getData();
			self.started = true;
		}
	}

});