const PIXI = require('pixi.js');
const EventEmitter = require('eventemitter3');
const Sprite = require('./Sprite');
const Costume = require('./Costume');
const Blocks = require('./Blocks');
const Types = require('./Types');

class Scene {
	constructor(sceneSettings={}) {
		let settings = {};

		if(sceneSettings.canvas) settings.view = sceneSettings.canvas;

		this.app = new PIXI.Application(settings);
		this.sprites = {};
		this.resources = {};
		this.sceneEvents = new EventEmitter();
		this.currentDelta = 0;
		this.Blocks = Blocks(this);

		this.scripts = {};

		this.started = false;

		if(!sceneSettings.canvas) document.body.appendChild(this.app.view);

		// Tick event emitter
		this.app.ticker.add(delta => {
			this.currentDelta = delta;

			if(this.started) this.sceneEvents.emit('tick', this);
		});
	}

	start() {
		this.started = true;
		this.dispatchEvent(Types.EVENTS.START);
	}

	addTexture(textureName, texturePath) {
		return new Promise(resolve => {
			// Load in the texture
			this.app.loader.add(textureName, texturePath).load((loader, resources) => {
				// Then create the costume and let all sprites know that it's loaded in.
				let costume = new Costume(resources[textureName]);
				this.resources[costume.name] = costume;

				this.sceneEvents.emit('texture-loaded', this.resources[costume.name]);

				resolve(costume);
			});
		});
	}

	addTextures(textures) {
		return Promise.all(textures.map(t => this.addTexture(t.name, t.path)));
	}

	dispatchEvent(eventID, data=null) {
		// Find all scripts with the given eventID
		(this.scripts[eventID] || []).forEach(script => {
			// Then only run them if their conditional is true
			if(script.condition(data, this, this.sprites[script.spriteID])) {
				script.func(this, this.sprites[script.spriteID]);
			}
		});
	}

	attachScript(event, script) {
		let scriptHandler = createScriptHandlerObject(event, script);

		if(this.scripts[event.type]) {
			this.scripts[event.type].push(scriptHandler);
		} else this.scripts[event.type] = [scriptHandler];
	}

	createSprite(spriteSettings) {
		let sprite = new Sprite(this, spriteSettings);

		this.sprites[sprite.name] = sprite;

		return sprite;
	}
}

function createScriptHandlerObject(event, script) {
	return {id: script.id, spriteID: script.spriteID, condition: event.condition, func: script.func};
}

module.exports = Scene;