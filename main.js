var wc = require('./wordcount');

process.argv.slice(2).forEach(function(item){
	wc.enqueue(item);
});

wc.mode = 'SYNC';
wc.count(function(error, total){
	if (error) {
		console.error('Something was wrong');
		return;
	}

	console.info('Total: ', total);
});