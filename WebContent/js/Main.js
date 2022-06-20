
window.onload = function() {
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

	// Add the States your game has.
	// game.state.add("Boot", Boot);
	// game.state.add("Menu", Menu);
	// game.state.add("Preload", Preload);
	game.musicOption=1;
	game.finalScore = 0;
	game.currentLevel = 1;
	game.state.add("homeScreen", homeScreen);
	game.state.add("finalScreen", finalScreen);
	game.state.add("Level", Level);
	game.state.start("homeScreen");
};
