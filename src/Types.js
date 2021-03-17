let EventID = require('./Types/EventID');

let Types = {
	Events: {
		Start: EventID(1)
	},
	Options: {
		EventID: require('./Types/EventID'),
		EventFilterOptions: require('./Types/EventFilterOptions'),
		SpriteScriptOptions: require('./Types/SpriteScriptOptions'),
		ScriptEventHandlerObject: require('./Types/ScriptEventHandlerObject')
	}
};

module.exports = Types;