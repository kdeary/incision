module.exports = (scene, sprite) => {
	return {
		...(require('./Blocks/Motion')(scene, sprite)),
		...(require('./Blocks/Control')(scene))
	};
};