let Utils = {};

Utils.waitUntil = (boolFunc, ms=50) => new Promise(resolve => {
	let interval = setInterval(() => {
		if(boolFunc()) {
			clearInterval(interval);
			resolve();
		}
	}, ms);
});

Utils.wait = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = Utils;