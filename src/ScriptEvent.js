function ScriptEvent(event) {
	let self = {
		type: event.type || 0,
		condition: event.data || (() => true)
	};

	return self;
}

module.exports = ScriptEvent;