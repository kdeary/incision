const PIXI = require('pixi.js');
const Types = require('../Types');

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