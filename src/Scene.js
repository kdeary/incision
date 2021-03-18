const PIXI = require('pixi.js');
const EventEmitter = require('eventemitter3');
const Sprite = require('./Sprite');
const Costume = require('./Costume');
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

		this.scripts = {};

		this.started = false;

		if(!sceneSettings.canvas) document.body.appendChild(this.app.view);

		// Tick event emitter
		this.app.ticker.add(delta => {
			this.currentDelta = delta;

			if(this.started) this.sceneEvents.emit('tick', this);
		});
	}

	get width() {return this.app.renderer.width}
	get height() {return this.app.renderer.height}

	/**
	 * Starts the scene. If successful, the function returns true.
	 * @return {Boolean}
	 */
	start() {
		this.started = true;
		this.dispatchEvent(Types.Events.Start);

		return true;
	}

	/**
	 * Adds one texture to the scene.
	 * @param  {String}  textureName The name of the texture. Used to retrieve the texture later. 
	 * @param  {String}  texturePath The path to the texture.
	 * @return {Promise} Promise that resolves with the Costume when the texture finishes loading.
	 */
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

	/**
	 * Adds multiple textures to the scene.
	 * @param  {Array}   textures An array of multiple texture names & paths: [{name: String, path: String}]
	 * @return {Promise} Promise that resolves with an array costumes when the texture finishes loading.
	 */
	addTextures(textures) {
		return Promise.all(textures.map(t => this.addTexture(t.name, t.path)));
	}

	/**
	 * @param  {EventID}  eventID The ID of the event to dispatch.
	 * @param  {Object}   data    Data associated with the event. Useful for the conditional to filter certain events.
	 * @return {Array}    Array of the scripts that ran.
	 */
	dispatchEvent(eventID, data=null) {
		let ranScripts = [];
		// Find all scripts with the given eventID
		(this.scripts[eventID] || []).forEach(script => {
			// Then only run them if their conditional is true
			if(script.condition(data, this, this.sprites[script.spriteID])) {
				script.func(this, this.sprites[script.spriteID]);
				ranScripts.push(script);
			}
		});

		return ranScripts;
	}

	/**
	 * Attaches a script to the scene that gets called whenever the event dispatched.
	 * @param  {EventFilterObject}   event  An object that holds the type of event the script should be dispatched for.
	 * @param  {SpriteScriptObject}  script 
	 * @return {ScriptEventHandlerObject} The created script handler object
	 */
	attachScript(event, script) {
		let scriptHandler = Types.Options.ScriptEventHandlerObject(event, script);

		if(this.scripts[event.type]) {
			this.scripts[event.type].push(scriptHandler);
		} else this.scripts[event.type] = [scriptHandler];

		return scriptHandler;
	}

	/**
	 * @param  {SpriteSettings} spriteSettings The sprite's settings
	 * @return {Sprite}
	 */
	createSprite(spriteSettings) {
		let sprite = new Sprite(this, spriteSettings);

		this.sprites[sprite.name] = sprite;

		return sprite;
	}
}

module.exports = Scene;