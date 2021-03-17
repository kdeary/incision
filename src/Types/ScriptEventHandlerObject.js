function ScriptEventHandlerObject(eventFilter, spriteScript) {
	return {
		id: spriteScript.id,
		spriteID: spriteScript.spriteID,
		condition: eventFilter.condition,
		func: spriteScript.func
	};
}

module.exports = ScriptEventHandlerObject;