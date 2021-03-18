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

Utils.randomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports = Utils;