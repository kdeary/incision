module.exports = (scene, sprite) => {
	return {
		...(require('./Blocks/Control')(scene))
	};
};