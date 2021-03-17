let scene = new Incision.Scene();
let Blocks = scene.Blocks;

scene.addTexture("behbble", "behbble.png").then(costume => {
	scene.start();
});

let behbble = scene.createSprite({
	name: "behbble",
	costumes: ["behbble"]
});

behbble.attach({
	type: Incision.Types.Events.Start,
	condition: (data, scene, sprite) => true
}, scene => {
	behbble.forever(async () => {
		behbble.x += 10;
		behbble.y += 10;
		await behbble.wait(1000);
	});
});