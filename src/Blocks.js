module.exports = (scene, sprite) => {
	return {
		...(require('./Blocks/Motion')(scene)),
		...(require('./Blocks/Control')(scene))
	};
};