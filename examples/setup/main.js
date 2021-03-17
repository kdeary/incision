let scene = new Incision.Scene();
let Blocks = scene.Blocks;

scene.addTexture("behbble", "behbble.png").then(costume => {
	scene.start();
});

let behbble = scene.createSprite({
	name: "behbble",
	costume: "behbble"
});

behbble.attach(Incision.ScriptEvent({
	type: Incision.Types.EVENTS.START,
	condition: (data, scene, sprite) => true
}), scene => {
	Blocks.forever(async () => {
		behbble.pixiSprite.x += 10;
		behbble.pixiSprite.y += 10;
		await Blocks.wait(1000);
	});
});