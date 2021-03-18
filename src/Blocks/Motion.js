const PIXI = require('pixi.js');
const Types = require('../Types');
const Utils = require('../Utils');

module.exports = (scene, sprite) => {
	let MotionBlocks = {};

	MotionBlocks.moveSteps = steps => {
		sprite.x += Math.cos(sprite.direction * PIXI.DEG_TO_RAD) * steps;
		sprite.y += Math.sin(sprite.direction * PIXI.DEG_TO_RAD) * steps;
		return sprite;
	};

	MotionBlocks.turnDegrees = degrees => {
		sprite.direction += degrees;
		return sprite;
	};

	MotionBlocks.goTo = place => {
		let position = generatePosition(place);
		if(!position) return sprite;
		sprite.goToXY(position.x, position.y);

		return sprite;
	};

	MotionBlocks.goToXY = (x, y) => {
		sprite.x = x;
		sprite.y = y;

		return sprite;
	};

	MotionBlocks.glideTo = (place, ms) => {
		let position = generatePosition(place);
		if(!position) return sprite;



		sprite.goToXY(position.x, position.y);

		return sprite;
	};

	MotionBlocks.glideToXY = async (x, y, ms) => {
		let delta = 0;
		let startPosition = {x: sprite.x, y: sprite.y};
		let slope = (startPosition.y - y) / (startPosition.x - x);
		let startDate = Date.now();

		while(delta < 1) {
			let xInput = (delta * (x - startPosition.x));
			sprite.x = (xInput + startPosition.x);
			sprite.y = (xInput + startPosition.y) * slope;

			delta = Math.min((Date.now() - startDate) / ms, 1);
			await Utils.wait(scene.elapsedMS);
		}

		sprite.goToXY(x, y);

		return sprite;
	};

	return MotionBlocks;
};

function generatePosition(place) {
	if(!place) return null;

	if(place === Types.Positions.RandomPosition) {
		return {
			x: Math.floor(Math.random() * scene.width),
			y: Math.floor(Math.random() * scene.height)
		};
	} else if(place === Types.Positions.Mouse) {
		return {
			x: Math.floor(Math.random() * scene.width),
			y: Math.floor(Math.random() * scene.height)
		};
	} else if(place.constructor.name === "Sprite"){
		return {x: place.x, y: place.y};
	} else if(scene.sprites[place]){
		return {x: scene.sprites[place].x, y: scene.sprites[place].y};
	}

	return null;
}