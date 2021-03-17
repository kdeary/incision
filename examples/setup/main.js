let scene = new Incision.Scene();

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
	scene.Blocks.forever(async () => {
		scene.sprites.behbble.pixiSprite.x += 10;
		scene.sprites.behbble.pixiSprite.y += 10;
		await scene.Blocks.wait(1000);
	});
});