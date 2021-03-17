module.exports = scene => {
	return {
		...(require('./Blocks/Control')(scene))
	};
};