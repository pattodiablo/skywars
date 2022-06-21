var db;
var tempdata;
window.onload = function() {

	window.indexedDB = window.indexedDB || window.mozIndexedDB ||
	window.webkitIndexedDB || window.msIndexedDB;

	//prefixes of window.IDB objects
	window.IDBTransaction = window.IDBTransaction ||
		window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
		window.msIDBKeyRange

	if (!window.indexedDB) {
		window.alert("Please open this game in the latest version of Google Chrome");
	}

	var request = window.indexedDB.open("CityHeroDB", 1);
	var dbfirsttime = false;


	request.onerror = function (event) {
		console.log("db not found");
	};

	request.onsuccess = function (event) {
		db = request.result;
		console.log(db.objectStoreNames.length);
		if(db.objectStoreNames.length<=0){


		}
		// remove();
		if (!dbfirsttime) {
			
			const objectStore = db.transaction(['gameData'], "readwrite").objectStore('gameData');

			const objectStoreDataRequest = objectStore.get(1);

			objectStoreDataRequest.onsuccess = () => {

				const result = objectStoreDataRequest.result;
				tempdata = result.data;
			
				crearJuego(tempdata);
			}
		}
		else{
			var tempdata={
				coins: 30,
				level: 1,
				core1: 0,
				core2: 0,
				core3: 0,
				timesDefeated: 0
			}
			crearJuego(tempdata);
		}
	};


	request.onupgradeneeded = function (event) {
		var db = event.target.result;
		if (event.oldVersion < 1) {
			var objectStore = db.createObjectStore("gameData",{ keyPath: "id", autoIncrement:true});
		  }
		objectStore.add({
			data: {
				coins: 30,
				level: 1,
				core1: 0,
				core2: 0,
				core3: 0,
				timesDefeated: 0
			}
		});
	  dbfirsttime = true;
	};
	

	function crearJuego(loadingData){
		var game = new Phaser.Game(1920, 1080, Phaser.AUTO);
		
		game.playerCoins = loadingData.coins;
		game.playerLevel = loadingData.level;
		game.playerCore1 = loadingData.core1;
		game.playerCore2 = loadingData.core2;
		game.playerCore3 = loadingData.core3;
		game.timesDefeated = loadingData.timesDefeated;
		game.musicOption=1;
		game.finalScore = 0;
		game.currentLevel = 1;
		game.state.add("homeScreen", homeScreen);
		game.state.add("finalScreen", finalScreen);
		game.state.add("Level", Level);
		game.state.start("homeScreen");

	}

	

	



};

function updatear(datos) {
	// Abra una transacción como de costumbre
	const objectStore = db.transaction(['gameData'], "readwrite").objectStore('gameData');
  
	const objectStoreDataRequest = objectStore.get(1);
	
	objectStoreDataRequest.onsuccess = () => {
		
		const result = objectStoreDataRequest.result;
		//data.notified = "yes";
		result.data = datos;
  
		const updateDataRequest = objectStore.put(result);
  
		updateDataRequest.onsuccess = () => {
			   var dbupdate = true;
			   //console.log("db updated")
			};
	}
  };
