const PIXI = require('pixi.js');
const Utils = require('./Utils');
const Blocks = require('./Blocks');
const SpriteScriptOptions = require('./Types/SpriteScriptOptions');
const SpriteSettings = require('./Types/SpriteSettings');

class Sprite {
	constructor(scene, rawSettings) {
		let settings = SpriteSettings(rawSettings);

		this.scene = scene;
		this.name = settings.name || "Sprite" + String(Date.now()).slice(-3);
		this.costumes = settings.costumes;
		this.selectedCostume = 0;
		this.scriptCount = 0;

		Object.assign(this, settings, Blocks(this.scene, this));

		this.pixiSprite = null;

		function costumeListener(costume) {
			let costumeIndex = this.costumes.findIndex(c => c === costume.name);
			if(costumeIndex > -1) {
				if(this.selectedCostume === costumeIndex) {
					this.pixiSprite.texture = this.scene.resources[costume.name].texture;
				}
			}
		}

		this.scene.sceneEvents.on('texture-loaded', costumeListener.bind(this));

		this.createPIXISprite();
	}

	createPIXISprite() {
		this.pixiSprite = new PIXI.Sprite();
		scene.app.stage.addChild(this.pixiSprite);
	}

	attach(event, scriptFunc) {
		if(typeof scriptFunc !== "function") throw new Error("Attached script must be a function.");

		this.scriptCount++;
		let scriptID = this.name + this.scriptCount;

		this.scene.attachScript(event, SpriteScriptOptions({
			id: scriptID,
			func: scriptFunc,
			spriteID: this.name
		}));

		return scriptID; 
	}

	get x() {return this.pixiSprite.x;}
	set x(x) {this.pixiSprite.x = x;}

	get y() {return this.pixiSprite.y;}
	set y(y) {this.pixiSprite.y = y;}

	get direction() {return this.pixiSprite.rotation * PIXI.RAD_TO_DEG;}
	set direction(degrees) {this.pixiSprite.rotation = PIXI.DEG_TO_RAD * degrees;}
}


module.exports = Sprite;