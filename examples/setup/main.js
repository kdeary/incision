let scene = new Incision.Scene();
let Blocks = scene.Blocks;

scene.addTexture("behbble", "behbble.png").then(costume => {
	scene.start();
});

let behbble = scene.createSprite({
	name: "behbble",
	costumes: ["behbble"]
});

// behbble.attach({
// 	type: Incision.Types.Events.Start,
// 	condition: (data, scene, sprite) => true
// }, async (scene) => {
// 	behbble.forever(async () => {
// 		behbble.x += 10;
// 		behbble.y += 10;
// 		await behbble.wait(1000);
// 	});
	
// 	let timer = Date.now();
// 	await behbble.glideTo(Incision.Types.Positions.Random, 1000);
// 	console.log(Date.now() - timer);
// });

behbble.attach({
	type: Incision.Types.Events.Start,
	condition: (data, scene, sprite) => true
}, async (scene) => {
	behbble.goToXY(0, 0);

	behbble.forever(async () => {
		behbble.moveSteps(1);
		behbble.direction += 1;
	});
});