const PIXI = require('pixi.js');
const Utils = require('./Utils');

class Sprite {
	constructor(scene, settings) {
		this.scene = scene;
		this.name = settings.name || "Sprite" + String(Date.now()).slice(-3);
		this.costumes = settings.costume ? [settings.costume] : [];
		this.selectedCostume = 0;
		this.scriptCount = 0;

		Object.assign(this, settings);

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

	get x() {return this.pixiSprite.x}
	set x(x) {this.pixiSprite.x = x;}

	get y() {return this.pixiSprite.y}
	set y(y) {this.pixiSprite.y = y;}

	createPIXISprite() {
		this.pixiSprite = new PIXI.Sprite();
		scene.app.stage.addChild(this.pixiSprite);
	}

	attach(event, scriptFunc) {
		if(typeof scriptFunc !== "function") throw new Error("Attached script must be a function.");

		this.scriptCount++;
		let scriptID = this.name + this.scriptCount;

		this.scene.attachScript(event, {
			id: scriptID,
			func: scriptFunc,
			spriteID: this.name
		});

		return scriptID; 
	}
}


module.exports = Sprite;