module.exports = (scene, sprite) => {
	let ControlBlocks = {};

	ControlBlocks.wait = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	};

	ControlBlocks.forever = (callback) => {
		let canCall = true;
		scene.sceneEvents.on('tick', async (...args) => {
			if(canCall) {
				canCall = false;
				await callback(...args);
				canCall = true;
			}
		});

		return sprite;
	};

	return ControlBlocks;
};