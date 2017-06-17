
var ipcMain = require('electron').ipcMain;
var localtunnel = require('./localtunnel/client');



ipcMain.on('submit', function (event, keyword) {
	var opt = {
	    host: keyword.host,
	    port: keyword.port,
	    local_host: keyword.local_host,
	    subdomain: keyword.subdomain,
	};
	localtunnel(opt.port, opt, function(err, tunnel) {
		var result = {
			'code':0,
			'url':'http://huahuashe.com'
		};
		//出错
	    if (err) {
	    	result.code = 1;
	    	event.sender.send('localtunnel', result);
	        //throw err;
	    }
	    result.url = tunnel.url;
	    event.sender.send('localtunnel', result);
	    //console.log('your url is: %s', tunnel.url);
	    tunnel.on('error', function(err) {
	        result.code = 2;
	    	event.sender.send('localtunnel', result);
	    });
	});
})