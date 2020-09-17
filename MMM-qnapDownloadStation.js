/* Magic Mirror
 * Module: MMM-qnapDownloadStation
 *
 * By Stuart McNally
 * MIT Licensed.
 */

Module.register('MMM-qnapDownloadStation',{


	defaults: {
		units: config.units,
		animationSpeed: 1000,
		updateInterval: 1000 * 20, //update every 20 secs
		refreshInterval: 1000 * 10, //refresh every 10 secs		
		timeFormat: config.timeFormat,
		lang: config.language,

		initialLoadDelay: 0, // 0 seconds delay
		retryDelay: 2500,
        
        useHeader: true,
        headerName: "Name",
        headerDownRate: "Down",
        headerUpRate: "Up",
        headerProgress: "%",
        headerStartTime: "Start",
        
        dateFormat: "DD/MM/YY, h:mm a", // date format from https://momentjs.com/
        
        showDownRate: true,
        showUpRate: false,
        showStartTime: false,
        showFinishTime: false, //*TO ADD
        showProgress: false,
        showDone: false, //*TO ADD
        showETA: false, //*TO ADD  
                
        fromNo: "0", //start record
        limit: "50", //maximum number of records to show
        type: "all", //type of downloads to show 
        status: "downloading", //status of downloads to show.  Available values; all, downloading, seeding, finished, paused, stopped, completed, active, inactive
        
        username: "",  //QNAP username
        password: "", //QNAP password

        qnapServer: "",
        loginUrl: "/downloadstation/V4/Misc/Login",
        queryUrl: "/downloadstation/V4/Task/Query",
	},

	getScripts: function() {
		return ["moment.js", "getSid.js"];
	},

	getStyles: function() {
		return ["font-awesome.css", "MMM-qnapDownloadStation.css"];
	},

	start: function() {
		Log.info('Starting module: ' + this.name);

		this.loaded = false;
        this.error = false;
        //this.nodownloads = false;
		this.sendSocketNotification('CONFIG', this.config);
	},

	getDom: function() {
              
        var t = this.data;
		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING');
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.data) {
			wrapper.innerHTML = "No data";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		// if (this.error) {
			// wrapper.innerHTML = "Error: Something went wrong";
			// wrapper.className = "dimmed light small";
			// return wrapper;
		// }
        
		// if (this.nodownloads) {
			// wrapper.innerHTML = "No downloads";
			// wrapper.className = "dimmed light small";
			// return wrapper;
		// }

// Creates a table when there are no downloads
		if (t.total < 1) {
        var wrapper = document.createElement("div");
        wrapper.className = "light small";
                  
        var table = document.createElement("table");
        table.className = "qtable";

        if (this.config.useHeader != false) {
            var thead = document.createElement('thead');
            thead.className = "qheader";
            table.appendChild(thead);
            var hrow = document.createElement("tr");
            hrow.className = "qheader";
            var hname = document.createElement("th");
            hname.innerHTML = this.config.headerName;
            hrow.appendChild(hname);

            if (this.config.showDownRate != false) {
            var hdownrate = document.createElement("th");
            hdownrate.innerHTML = this.config.headerDownRate;
            hdownrate.className = "qheaderdown";
            hrow.appendChild(hdownrate);            
            }   

            if (this.config.showUpRate != false) {
            var huprate = document.createElement("th");
            huprate.innerHTML = this.config.headerUpRate;
            huprate.className = "qheaderup";
            hrow.appendChild(huprate);            
            }

            if (this.config.showProgress != false) {
            var hprogress = document.createElement("th");
            hprogress.innerHTML = this.config.headerProgress;
            hprogress.className = "qheaderprogress";
            hrow.appendChild(hprogress);            
            }

            if (this.config.showStartTime != false) {
            var hstarttime = document.createElement("th");
            hstarttime.innerHTML = this.config.headerStartTime;
            hrow.appendChild(hstarttime);            
            }
            
            table.appendChild(hrow);
        }  
                {
            var row = document.createElement("tr");
            row.className = "qname";
            var name = document.createElement("td");
            name.className = "qname";
            name.innerHTML = "NO DOWNLOADS ";
            
            row.appendChild(name);

            if (this.config.showDownRate != false) {
            var downrate = document.createElement("td");
            downrate.innerHTML = " ";
            downrate.className = "qrate";
            row.appendChild(downrate);            
            }  
            
            if (this.config.showUpRate != false) {
            var uprate = document.createElement("td");
            uprate.innerHTML = " ";
            uprate.className = "qrate";
            row.appendChild(uprate);            
            }      

            if (this.config.showProgress != false) {
            var progress = document.createElement("td");
            progress.innerHTML = "";
            progress.className = "qprogress";
            row.appendChild(progress);            
            }

            if (this.config.showStartTime != false) {
            var starttime = document.createElement("td");
            starttime.innerHTML = " ";
            starttime.className = "qstarttime";
            row.appendChild(starttime);            
            }  
            
            table.appendChild(row);
        }
        wrapper.appendChild(table);
		return wrapper;
        }
// End     
        
        var wrapper = document.createElement("div");
        wrapper.className = "light small";
            
        var table = document.createElement("table");
        table.className = "qtable";

        if (this.config.useHeader != false) {
            var thead = document.createElement('thead');
            thead.className = "qheader";
            table.appendChild(thead);
            var hrow = document.createElement("tr");
            hrow.className = "qheader";
            var hname = document.createElement("th");
            hname.innerHTML = this.config.headerName;
            hrow.appendChild(hname);

            if (this.config.showDownRate != false) {
            var hdownrate = document.createElement("th");
            hdownrate.innerHTML = this.config.headerDownRate;
            hdownrate.className = "qheaderdown";
            hrow.appendChild(hdownrate);            
            }   

            if (this.config.showUpRate != false) {
            var huprate = document.createElement("th");
            huprate.innerHTML = this.config.headerUpRate;
            huprate.className = "qheaderup";
            hrow.appendChild(huprate);            
            }

            if (this.config.showProgress != false) {
            var hprogress = document.createElement("th");
            hprogress.innerHTML = this.config.headerProgress;
            hprogress.className = "qheaderprogress";
            hrow.appendChild(hprogress);            
            }

            if (this.config.showStartTime != false) {
            var hstarttime = document.createElement("th");
            hstarttime.innerHTML = this.config.headerStartTime;
            hrow.appendChild(hstarttime);            
            }
            
            table.appendChild(hrow);
        }      
                       
            for (var i = 0; i < t.data.length; i++)
        {
            var row = document.createElement("tr");
            row.className = "qrow";
            var name = document.createElement("td");
            name.className = "qname";
            name.innerHTML = t.data[i].source;
            
            row.appendChild(name);

            if (this.config.showDownRate != false) {
            var downrate = document.createElement("td");
            downrate.innerHTML = t.data[i].down_rate;
            downrate.className = "qrate";
            row.appendChild(downrate);            
            }  
            
            if (this.config.showUpRate != false) {
            var uprate = document.createElement("td");
            //uprate.innerHTML = t.data[i].up_rate + " Mbps";
            uprate.innerHTML = t.data[i].up_rate;
            uprate.className = "qrate";
            row.appendChild(uprate);            
            }      

            if (this.config.showProgress != false) {
            var progress = document.createElement("td");
            progress.innerHTML = t.data[i].progress + "%";
            progress.className = "qprogress";
            row.appendChild(progress);            
            }

            if (this.config.showStartTime != false) {
            var starttime = document.createElement("td");
            starttime.innerHTML = t.data[i].start_time;
            starttime.className = "qstarttime";
            row.appendChild(starttime);            
            }               

            table.appendChild(row);
        }
        wrapper.appendChild(table);

		return wrapper;

	},

 	socketNotificationReceived: function(notification, payload) {
    		if (notification === "STARTED") {
				this.updateDom();
                Log.info('STARTED');
			}
			else if (notification === "DATA") {
				this.loaded = true;
                var dateFormat = this.config.dateFormat;
                
                var payload = JSON.parse(payload, function (key, value) {
                    
                    readableBytes = function(bytes) {
                        if ( bytes === 0) {
                            return bytes;
                        }
                        else {
                              var i = Math.floor(Math.log(bytes) / Math.log(1024)),
                              sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                              return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
                             }
                        };
                    
                    if ( key === 'source' ) {
                        return value;
                        //return value.toUpperCase();
                    } 
                    else if ( key === 'start_time' ) {
                        var newDate = new Date(value);
                        var formattedDate = moment(newDate).format(dateFormat);                    
                        return formattedDate;
                    }
                    else if ( key === 'down_rate' ) {
                        //var downrate = Number(value);
                        //return (downrate/(1024*1024)).toFixed(2);  
                        setDownRate = readableBytes(value,2);
                        return setDownRate;
                    }
                    else if ( key === 'up_rate' ) {   
                        setUpRate = readableBytes(value,2);
                        return setUpRate;
                    }
                    else {
                    return value; // return unchanged
                    }
                });
                    
                
				this.processData(payload);
                //this.processData(JSON.parse(payload));
				this.updateDom();
                //Log.info('DATA: ' + payload);
    		}
	},
    
	processData: function(data) {

		if (!data) {
            return;
            Log.info('NO DATA');
		}

		this.data = data;
        
        var t = this.data;

        // for (var i = 0; i < t.data.length; i++)        
        // if (t.data[i] < 0){
            // this.nodownloads = true;
        // }        
        
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	}
    
});