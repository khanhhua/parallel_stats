var fs = require('fs'),
	path = require('path'),
	async = require('async');

var filepathArray = [];

exports.mode = 'ASYNC'; // 'ASYNC' | 'SYNC'

exports.enqueue = function(filepath) {
	if (filepath)
		filepath = path.normalize(filepath);
	else
		return;

	filepathArray.push(filepath);
};

exports.count = function(callback) {
	console.log('MODE: ',exports.mode);
	if (exports.mode === 'SYNC')
		console.log('::: Using fs.statSync');
	else
		console.log('::: Using fs.stat');

	var total = 0;

	async.each(filepathArray, 
		// Define the iterator function
		function(item, done){
			console.log('Processing: ',item);
			// ### SYNC
			if (exports.mode === 'SYNC'){
				var stats = fs.statSync(item);
				if (stats.isFile)
					total += stats.size;
				// Must call done() to signal when a process is complete
				console.log('==>', item, stats.size);
				done();				
			} else if (exports.mode === 'ASYNC'){
				// ### ASYNC
				fs.stat(item, function(error, stats){
					if (stats.isFile)
						total += stats.size;
					// Must call done() to signal when a process is complete
					console.log('==>', item, stats.size);
					done();				
				});
			}
		}, 
		function(error, result){
			// async.each CALLBACK is called after all the done's
			// above is called
			console.info('ALL is DONE!');
			if (error)
				callback(error);
			else
				callback(null,total);
		});
};