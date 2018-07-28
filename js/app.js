let gameWindowWidth = 640;
let gameWindowHeight = 480;

//creating engine
let pjs = new PointJS(gameWindowWidth, gameWindowHeight, {
	backgroundColor: 'white' // optional
});

// pjs.system.resize( gameWindowWidth, gameWindowHeight );
// pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)
let log = pjs.system.log;     // log = console.log;
let game = pjs.game;           // Game Manager
let point = pjs.vector.point;   // Constructor for Point
let camera = pjs.camera;         // Camera Manager
let brush = pjs.brush;          // Brush, used for simple drawing
let OOP = pjs.OOP;            // Objects manager
let math = pjs.math;           // More Math-methods
let levels = pjs.levels;         // Levels manager
// let layers = pjs.layers;
let tiles = pjs.tiles;
let system = pjs.system;
let key = pjs.keyControl.initKeyControl();
let mouse = pjs.mouseControl.initMouseControl();
// let touch = pjs.touchControl.initTouchControl();
// let act   = pjs.actionControl.initActionControl();
let width = game.getWH().w; // width of scene viewport
let height = game.getWH().h; // height of scene viewport
let path_environment = './img/environment/',
	path_characters = './img/characters/',
	path_equipment = './img/equipment/';
let progressLoading = 0;
let progressState = '';

///////////////////////////////
// PRELOADS
///////////////////////////////

// let loading = system.newDOM('div');
// loading.className = 'loading';
// loading.innerHTML = `
// 	<div id="counter">1</div>
// `;


let obj = {
	ground: [
		ground_0 = {
			file: path_environment + 'ground_0.jpg',
			defaultWidth: 96, defaultHeight: 32,
		},
		ground_1 = {
			file: path_environment + 'ground_1.jpg',
			defaultWidth: 96, defaultHeight: 32,
		},
		ground_2 = {
			file: path_environment + 'ground_1alt.jpg',
			defaultWidth: 96, defaultHeight: 32,
		},
		ground_3 = {
			file: path_environment + 'ground_0alt.jpg',
			defaultWidth: 96, defaultHeight: 32,
		},
		grass_0 = {
			file: path_environment + 'grass_0.png',
			defaultWidth: 96, defaultHeight: 32,
		},
	],
	characters: [
		player0_stand = {
			file: path_characters + 'player_stand.png',
			defaultWidth: 290, defaultHeight: 290,
			speed: 2.8, frames: 4,
		},
		player0_run = {
			file: path_characters + 'player_run.png',
			defaultWidth: 300, defaultHeight: 266,
			speed: 2, frames: 5,
		},
		player0_jump = {
			file: path_characters + 'player_jump.png',
			defaultWidth: 300, defaultHeight: 300,
			speed: 2, frames: 3,
		},
		enemy0_stand = {
			file: path_characters + 'enemy0_stand.png',
			defaultWidth: 550, defaultHeight: 655,
			speed: 2, frames: 4,
		},
		enemy0_run = {
			file: path_characters + 'enemy0_run.png',
			defaultWidth: 550, defaultHeight: 655,
			speed: 2, frames: 5,
		},
		enemy0_attack = {
			file: path_characters + 'enemy0_attack.png',
			defaultWidth: 770, defaultHeight: 690,
			speed: 2, frames: 5,
		},
		player0_defense = {
			file: path_characters + 'player_defense.png',
			defaultWidth: 300, defaultHeight: 300,
			speed: 2, frames: 4,
		},
		player0_died = {
			file: path_characters + 'player_died.png',
			defaultWidth: 300, defaultHeight: 300,
			speed: 2, frames: 4,
		},
		player0_attack = {
			file: path_characters + 'player_attack.png',
			defaultWidth: 300, defaultHeight: 300,
			speed: 2, frames: 3,
		},
	],
	shadow: [
		default_0 = {
			shadowColor: "gray",
			shadowBlur: 6,
			shadowX: 2,
			shadowY: 2
		},
		angry = {
			shadowColor: "red",
			shadowBlur: 6,
			shadowX: 0,
			shadowY: 0
		},
		angry_enemy = {
			shadowColor: "red",
			shadowBlur: 8,
			shadowX: 0,
			shadowY: 0
		},
		blocked = {
			shadowColor: "orange",
			shadowBlur: 6,
			shadowX: 0,
			shadowY: 0
		},
	],
	sounds: {
		bgMusic: new Audio('audio/Danger.mp3'),
		soundAttackSword1: new Audio('audio/attack-sword1.mp3'),
		soundAttackSword: new Audio('audio/attack-sword.mp3'),
		soundAttackSwordBlock: new Audio('audio/attack-sword-block.mp3'),
		soundDeathSkilet: new Audio('audio/death-skilet.mp3'),
		soundDeathHero: new Audio('audio/death-hero.mp3'),
		healingPotion: new Audio('audio/healing-potion.mp3'),
		pain: new Audio('audio/pain.mp3'),
	},
	environment: {
		bush: {
			file: path_environment + 'bush.png',
			w: 96, h: 80,
		},
		cleaveTree: {
			file: path_environment + 'cleaved-tree.png',
			w: 25, h: 19,
		},
		firTree: {
			file: path_environment + 'fir-tree.png',
			w: 150, h: 250,
		},
		highTree: {
			file: path_environment + 'high-tree.png',
			w: 250, h: 400,
		},
		rocks1: {
			file: path_environment + 'rocks1.png',
			w: 82, h: 27,
		},
		rocks2: {
			file: path_environment + 'rocks2.png',
			w: 63, h: 29,
		},
		rocks3: {
			file: path_environment + 'rocks3.png',
			w: 61, h: 45,
		},
		rocks4: {
			file: path_environment + 'rocks4.png',
			w: 58, h: 41,
		},
		rocks5: {
			file: path_environment + 'rocks5.png',
			w: 29, h: 48,
		},
		rocks6: {
			file: path_environment + 'rocks6.png',
			w: 24, h: 59,
		},
		stoneHead: {
			file: path_environment + 'stone-head.png',
			w: 57, h: 91,
		},
		tree: {
			file: path_environment + 'tree.png',
			w: 95, h: 117,
		},
		wildTree: {
			file: path_environment + 'wild-tree.png',
			w: 60, h: 90,
		},
		house: {
			file: path_environment + 'house.png',
			w: 553, h: 500,
		},
		castle: {
			file: path_environment + 'castle.png',
			w: 316, h: 555,
		},
		trap: {
			file: path_environment + 'trap.png',
			w: 70, h: 70,
		},
		cross: {
			file: path_environment + 'cross.png',
			w: 50, h: 70,
		},
		bones: {
			file: path_environment + 'bones.png',
			w: 60, h: 70,
		},
		gold: {
			file: path_environment + 'gold.png',
			w: 120, h: 120,
		},
	},
	potions: {
		healingPotion: {
			file: path_equipment + 'potionRed.png',
			w: 80, h: 80
		},
		deadlyPotion: {
			file: path_equipment + 'potionGreen.png',
			w: 60, h: 60
		},
		gem: {
			file: path_equipment + 'gemRed.png',
			w: 60, h: 60
		},
	},
};

for (let key in obj.ground)
	obj.ground[key].onload = function () {
		progressLoading++;
		progressState = this.file;
	}
for (let key in obj.characters)
	obj.characters[key].onload = function () {
		progressLoading++;
		progressState = this.file;
	}
for (let key in obj.sounds) {
	obj.sounds[key].oncanplaythrough = function () {
		progressLoading++;
		progressState = this.src;
	}
}
for (let key in obj.environment) {
	obj.environment[key].onload = function () {
		progressLoading++;
		progressState = this.file;
	}
}
for (let key in obj.potions)
	obj.potions[key].onload = function () {
		progressLoading++;
		progressState = this.file;
	}


//building ground
let floor = [
	buildArrObjects([obj.ground[4]], -100, 495, 100),//grass,
	buildArrObjects([obj.ground[2]], -105, 525, 100,),//light ground,
	buildArrObjects([obj.ground[2], obj.ground[1]], -100, 556, 100),//light ground,
	buildArrObjects([obj.ground[1], obj.ground[2]], -90, 587, 100),//light ground,
	buildArrObjects([obj.ground[3]], -105, 618, 100),//dark ground
	buildArrObjects([obj.ground[0], obj.ground[3]], -105, 649, 100),//dark ground
	buildArrObjects([obj.ground[3], obj.ground[0]], -100, 679, 100),//dark ground
	buildArrObjects([obj.ground[0], obj.ground[3]], -75, 700, 100),//dark ground
	buildArrObjects([obj.ground[0], obj.ground[3]], -75, 721, 100),//dark ground
	buildArrObjects([obj.ground[0], obj.ground[3]], -75, 742, 100),//dark ground
	buildArrObjects([obj.ground[0], obj.ground[3]], -75, 763, 100),//dark ground
	buildArrObjects([obj.ground[0], obj.ground[3]], -75, 784, 100),//dark ground
	buildArrObjects([obj.ground[0], obj.ground[3]], -75, 805, 100),//dark ground
];

let environment = [
	[game.newImageObject(obj.environment.bush),//bushes
		game.newImageObject(obj.environment.bush),
		game.newImageObject(obj.environment.bush),
		game.newImageObject(obj.environment.bush),
		game.newImageObject(obj.environment.bush),
	],
	[game.newImageObject(obj.environment.cleaveTree),//cleaveTrees
		game.newImageObject(obj.environment.cleaveTree),
		game.newImageObject(obj.environment.cleaveTree),
		game.newImageObject(obj.environment.cleaveTree),
	],
	[game.newImageObject(obj.environment.firTree),//firTrees
		game.newImageObject(obj.environment.firTree),
		game.newImageObject(obj.environment.firTree),
	],
	[game.newImageObject(obj.environment.highTree),//highTrees
		game.newImageObject(obj.environment.highTree),
		game.newImageObject(obj.environment.highTree),
		game.newImageObject(obj.environment.highTree),
		game.newImageObject(obj.environment.highTree),
	],
	[game.newImageObject(obj.environment.rocks1),//rocks
		game.newImageObject(obj.environment.rocks2),
		game.newImageObject(obj.environment.rocks3),
		game.newImageObject(obj.environment.rocks4),
		game.newImageObject(obj.environment.rocks5),
		game.newImageObject(obj.environment.rocks6),
	],
	[game.newImageObject(obj.environment.stoneHead)],//stoneHead
	[game.newImageObject(obj.environment.tree),//trees
		game.newImageObject(obj.environment.tree),
	],
	[game.newImageObject(obj.environment.wildTree)],//wildTree
];

//build environment:
//bushes
environment[0][0].setPositionC(point(855, 465));
environment[0][1].setPositionC(point(2000, 465));
environment[0][2].setPositionC(point(3055, 465));
environment[0][3].setPositionC(point(4555, 465));
environment[0][4].setPositionC(point(5555, 465));
//cleaveTrees
environment[1][0].setPositionC(point(200, 490));
environment[1][1].setPositionC(point(2755, 490));
environment[1][2].setPositionC(point(5055, 490));
environment[1][3].setPositionC(point(7555, 490));
//firTrees
environment[2][0].setPositionC(point(2255, 400));
environment[2][1].setPositionC(point(5555, 400));
environment[2][2].setPositionC(point(6355, 400));
//highTrees
environment[3][0].setPositionC(point(1420, 320));
environment[3][1].setPositionC(point(3170, 320));
environment[3][2].setPositionC(point(4090, 320));
environment[3][3].setPositionC(point(6830, 320));
environment[3][4].setPositionC(point(7900, 320));
//rocks
environment[4][0].setPositionC(point(693, 495));
environment[4][1].setPositionC(point(1692, 495));
environment[4][2].setPositionC(point(3597, 495));
environment[4][3].setPositionC(point(4694, 495));
environment[4][4].setPositionC(point(6011, 495));
environment[4][5].setPositionC(point(7284, 495));
//stoneHead
environment[5][0].setPositionC(point(6684, 460));
//trees
environment[6][0].setPositionC(point(4626, 450));
environment[6][1].setPositionC(point(7640, 450));
//wildTree
environment[7][0].setPositionC(point(8200, 460));
//potions
let potions = [];
potions.push(game.newImageObject(obj.potions.healingPotion));
potions.push(game.newImageObject(obj.potions.healingPotion));
potions.push(game.newImageObject(obj.potions.healingPotion));
potions.push(game.newImageObject(obj.potions.healingPotion));
potions[0].setPosition(point(1440, 180));
potions[1].setPosition(point(3980, 215));
potions[2].setPosition(point(6610, 440));
potions[3].setPosition(point(680, 440));
//house
let house = game.newImageObject(obj.environment.house);
house.setPosition(point(200, 150));
//castle
let castle = game.newImageObject(obj.environment.castle);
castle.setPosition(point(8423, -20));
//traps
let traps = [game.newImageObject(obj.potions.deadlyPotion), game.newImageObject(obj.environment.trap)];
traps[0].setPosition(point(4470, 455));
traps[1].setPosition(point(5275, 480));
//gem
let gem = [game.newImageObject(obj.potions.gem)];
gem[0].setPosition(point(6660, 375));
//gold
let gold = [game.newImageObject(obj.environment.gold)];
gold[0].setPosition(point(8280, 450));

//animation from sprite
let player_img = tiles.newImage(obj.characters[0].file);
let player_anim = player_img.getAnimation(0, 0, obj.characters[0].defaultWidth, obj.characters[0].defaultHeight, obj.characters[0].frames);
let player_stand = game.newAnimationObject({
	// animation: tiles.newAnimation(obj.characters[1].file, 300, 266, 5),
	animation: player_anim,
	w: 150, h: 150,
	x: 110, y: 300,
	delay: 20,
});
let player_run = game.newAnimationObject({
	animation: tiles.newAnimation(obj.characters[1].file, obj.characters[1].defaultWidth, obj.characters[1].defaultHeight, obj.characters[1].frames),
	w: 150, h: 150,
	delay: 6,
});
let player_jump = game.newAnimationObject({
	animation: tiles.newAnimation(obj.characters[2].file, obj.characters[2].defaultWidth, obj.characters[2].defaultHeight, obj.characters[2].frames),
	w: 150, h: 150,
	delay: 110,
});
let player_defense = game.newAnimationObject({
	animation: tiles.newAnimation(obj.characters[6].file, obj.characters[6].defaultWidth, obj.characters[6].defaultHeight, obj.characters[6].frames),
	w: 150, h: 150,
	delay: 10,
});
let player_died = game.newAnimationObject({
	animation: tiles.newAnimation(obj.characters[7].file, obj.characters[7].defaultWidth, obj.characters[7].defaultHeight, obj.characters[7].frames),
	w: 150, h: 150,
	delay: 10,
});
let player_attack = game.newAnimationObject({
	animation: tiles.newAnimation(obj.characters[8].file, obj.characters[8].defaultWidth, obj.characters[8].defaultHeight, obj.characters[8].frames),
	w: 150, h: 150,
	delay: 20,
});
let realBoxObject = game.newRectObject({
	x: 800, y: player_stand.y,
	w: 80, h: 150
});
realBoxObject.isInitFight = false;
realBoxObject.comboCounter = 0;
realBoxObject.attack = 1;
realBoxObject.comboArray = [];
realBoxObject.isGenerateCombo = false;
realBoxObject.HP = 40;
realBoxObject.maxHP = 40;
realBoxObject.playerBlockTimer = new Date();
realBoxObject.playerBlocked = false;
realBoxObject.playerBlockDuration = 300;
realBoxObject.wasAttack = false;
realBoxObject.playerTimer;
realBoxObject.keyAccess = true;
realBoxObject.player_speed = point();
realBoxObject.startJump = 0;

//realize fighting system of player
function fightingSystemOfPlayer(enemy) {
	if (realBoxObject.isInitFight) {
		let time = new Date();
		let rez = time - realBoxObject.playerTimer;
		let damage = 0;

		brush.drawRect({
			x: camera.getPosition().x + 30, y: camera.getPosition().y + 240,
			w: 20, h: 80,
			fillColor: realBoxObject.comboCounter >= 3 ? 'orange' : 'white',
			strokeColor: 'black',
			strokeWidth: 2
		});
		brush.drawRect({
			x: camera.getPosition().x + 30, y: camera.getPosition().y + 320,
			w: 20, h: 80,
			fillColor: realBoxObject.comboCounter >= 2 ? 'orange' : 'white',
			strokeColor: 'black',
			strokeWidth: 2
		});
		brush.drawRect({
			x: camera.getPosition().x + 30, y: camera.getPosition().y + 400,
			w: 20, h: 80,
			fillColor: realBoxObject.comboCounter >= 1 ? 'orange' : 'white',
			strokeColor: 'black',
			strokeWidth: 2
		});
		if (realBoxObject.comboCounter === 0) damage = 0;
		if (realBoxObject.comboCounter === 1) damage = realBoxObject.attack * 1;
		if (realBoxObject.comboCounter === 2) damage = realBoxObject.attack * 2 + 1;
		if (realBoxObject.comboCounter === 3) damage = realBoxObject.attack * 3 + 2;
		pjs.brush.drawText({
			text: 'Damage: ' + damage.toFixed(1),
			x: camera.getPosition().x + 30, y: camera.getPosition().y + 490,
			color: "black",
			style: 'bold',
			size: 30
		});

		if (rez > 1000 && !realBoxObject.isGenerateCombo) {
			realBoxObject.isGenerateCombo = true;
			for (let i = 0; i < 3; i++)
				realBoxObject.comboArray[i] = math.random(1, 3);
		}
		if (rez > 1001 && realBoxObject.isGenerateCombo) {
			if (realBoxObject.HP >= 0) {
				if (realBoxObject.comboArray[0] !== 0) {
					brush.drawRoundRect({
						x: realBoxObject.x + 30, y: realBoxObject.y - 40,
						radius: 5,
						w: 30, h: 30,
						fillColor: '#e2e24a',
						strokeColor: 'black',
						strokeWidth: 2
					});
					pjs.brush.drawText({
						text: realBoxObject.comboArray[0],
						x: realBoxObject.x + 40, y: realBoxObject.y - 34,
						color: "black",
						style: 'bold',
						size: 20
					});
				}
				if (realBoxObject.comboArray[1] !== 0) {
					brush.drawRoundRect({
						x: realBoxObject.x + 60, y: realBoxObject.y - 40,
						radius: 5,
						w: 30, h: 30,
						fillColor: '#e2e24a',
						strokeColor: 'black',
						strokeWidth: 2
					});
					pjs.brush.drawText({
						text: realBoxObject.comboArray[1],
						x: realBoxObject.x + 70, y: realBoxObject.y - 34,
						color: "black",
						style: 'bold',
						size: 20
					});
				}
				if (realBoxObject.comboArray[2] !== 0) {
					brush.drawRoundRect({
						x: realBoxObject.x + 90, y: realBoxObject.y - 40,
						radius: 5,
						w: 30, h: 30,
						fillColor: '#e2e24a',
						strokeColor: 'black',
						strokeWidth: 2
					});
					pjs.brush.drawText({
						text: realBoxObject.comboArray[2],
						x: realBoxObject.x + 100, y: realBoxObject.y - 34,
						color: "black",
						style: 'bold',
						size: 20
					});
				}
			}
			if (key.isPress('1')) {
				for (let i = 1; i <= 3; i++) {
					if (realBoxObject.comboArray[i - 1] === 1) {
						realBoxObject.comboArray[i - 1] = 0;
						realBoxObject.comboCounter++;
						break;
					}
				}
			}
			if (key.isPress('2')) {
				for (let i = 1; i <= 3; i++) {
					if (realBoxObject.comboArray[i - 1] === 2) {
						realBoxObject.comboArray[i - 1] = 0;
						realBoxObject.comboCounter++;
						break;
					}
				}
			}
			if (key.isPress('3')) {
				for (let i = 1; i <= 3; i++) {
					if (realBoxObject.comboArray[i - 1] === 3) {
						realBoxObject.comboArray[i - 1] = 0;
						realBoxObject.comboCounter++;
						break;
					}
				}
			}
		}
		if (rez > 2500 && realBoxObject.isGenerateCombo && realBoxObject.comboCounter > 0) {
			player_attack.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y));
			realBoxObject.animationObject = player_attack;
			obj.sounds.soundAttackSword1.play();
		}
		if (rez > 3000 && realBoxObject.isGenerateCombo) {
			if (realBoxObject.comboCounter === 1) {
				enemy.HP -= realBoxObject.attack; //-1
			}
			if (realBoxObject.comboCounter === 2) {
				enemy.HP -= realBoxObject.attack * (realBoxObject.comboCounter + 1); //-3
			}
			if (realBoxObject.comboCounter === 3) {
				enemy.HP -= realBoxObject.attack * (realBoxObject.comboCounter + 2); //-5
			}
			realBoxObject.isGenerateCombo = false;
			realBoxObject.comboArray = [];
			realBoxObject.comboCounter = 0;
			realBoxObject.animationObject = player_stand;
			realBoxObject.playerTimer = new Date();
		}
	}
}

let myText = game.newTextObject({
	positionC: point(game.getWH2().w + 750, game.getWH2().h), // central position of text
	size: 50, // size text
	color: '#EAEAEA', // color text
	text: 'Hello, World1!', // label
	font: 'Arial' // font family
});

//let's create my army ahaaahaaha(evil laugh)
let enemy1 = game.newRectObject({
	w: 80, h: 165,
	x: 1905, y: 300,
});
let enemy_army = [];
enemy_army.push(enemy1);
enemy_army.push(game.newRectObject({
	w: 80, h: 165,
	x: 2760, y: 300,
}));
enemy_army.push(game.newRectObject({
	w: 80, h: 165,
	x: 3723, y: 300,
}));
enemy_army.push(game.newRectObject({
	w: 80, h: 165,
	x: 5738, y: 300,
}));
enemy_army.push(game.newRectObject({
	w: 80, h: 165,
	x: 6150, y: 300,
}));
enemy_army.push(game.newRectObject({
	w: 80, h: 165,
	x: 7338, y: 300,
}));
enemy_army.push(game.newRectObject({
	w: 80, h: 165,
	x: 8050, y: 300,
}));
enemy_army.push(game.newRectObject({
	w: 80, h: 165,
	x: 8100, y: 300,
}));

//enemies animations
let enemy_stand = game.newAnimationObject({
	animation: tiles.newImage(obj.characters[3].file).getAnimation(0, 0, obj.characters[3].defaultWidth, obj.characters[3].defaultHeight, obj.characters[3].frames),
	x: enemy1.x, y: enemy1.y,
	w: 150, h: 165,
	delay: 13,
});
let enemy_run = game.newAnimationObject({
	animation: tiles.newImage(obj.characters[4].file).getAnimation(0, 0, obj.characters[4].defaultWidth, obj.characters[4].defaultHeight, obj.characters[4].frames),
	x: enemy1.x, y: enemy1.y,
	w: 150, h: 165,
	delay: 25,
});
let enemy_attack = game.newAnimationObject({
	animation: tiles.newImage(obj.characters[5].file).getAnimation(0, 0, obj.characters[5].defaultWidth, obj.characters[5].defaultHeight, obj.characters[5].frames),
	x: enemy1.x, y: enemy1.y,
	w: 200, h: 175,
	delay: 7,
});

for (let i = 0; i < enemy_army.length; i++) {
	enemy_army[i].speed = point();
	enemy_army[i].speed.y = 6;
	enemy_army[i].area_browsing = 100;
	enemy_army[i].isBrowsing = false;
	enemy_army[i].basePosition = 500;
	enemy_army[i].HP = 20;
	enemy_army[i].maxHP = 20;
	enemy_army[i].isInitFight = false;
	enemy_army[i].maxEnemyAttack = 7;
	enemy_army[i].minEnemyAttack = 3;
	enemy_army[i].initBrowsing = function (bool = true) {
		let flag = bool;
		if (flag) {
			this.basePosition = this.x;
			this.isBrowsing = flag;
			this.speed.x = 2;
		} else this.speed.x = 0;
	};
	enemy_army[i].animationObject = enemy_stand;
}

//realize fight
function fightingSystemOfEnemy(enemy) {
	if (enemy.isInitFight) {
		let time = new Date();
		let rez = time - enemyTimer;
		if ((rez > 1400) && (enemy.animationObject != enemy_attack)) {
			enemy.animationObject.setShadow(obj.shadow[2]);
		}
		if ((rez > 1500) && (enemy.animationObject != enemy_attack)) {
			enemy_attack.setPosition(point(enemy.getPosition().x - 95, enemy.getPosition().y - 10));
			enemy_attack.setFlip(true, false);
			enemy.animationObject = enemy_attack;
			enemy.animationObject.drawFrames(1, 3);
			enemy.animationObject.setFlip(true, false);
			enemy.animationObject.step = 5;
			enemy.animationObject.setShadow(obj.shadow[2]);
		}
		//do attack
		if ((rez > 1800) && (rez < 2100) && !realBoxObject.wasAttack) {
			if (realBoxObject.playerBlocked) {
				realBoxObject.HP -= (Math.round(Math.random() * (enemy.maxEnemyAttack - enemy.minEnemyAttack) + enemy.minEnemyAttack)) * 0.53;
				realBoxObject.animationObject.setShadow(obj.shadow[3]);
				checkHit = true;
				obj.sounds.soundAttackSword.play();
			}
			else {
				realBoxObject.HP -= (Math.round(Math.random() * (enemy.maxEnemyAttack - enemy.minEnemyAttack) + enemy.minEnemyAttack));
				realBoxObject.animationObject.setShadow(obj.shadow[1]);
				checkHit = false;
				obj.sounds.soundAttackSwordBlock.play();
			}
			realBoxObject.wasAttack = true;

		}
		//block activated of not
		if (rez > 1800 && rez < 2100) {
			if (checkHit == true) {
				game.newImageObject({
					file: path_equipment + 'upgShieldSmall.png',
					w: 100, h: 100,
					x: realBoxObject.x - 50, y: realBoxObject.y - 80,
				}).draw();
			} else {
				game.newImageObject({
					file: path_equipment + 'x.png',
					w: 100, h: 100,
					x: realBoxObject.x - 50, y: realBoxObject.y - 80,
				}).draw();
			}
		}
		if (rez > 2100) {
			player_stand.setShadow(obj.shadow[0]);
			player_run.setShadow(obj.shadow[0]);
			player_jump.setShadow(obj.shadow[0]);
			player_defense.setShadow(obj.shadow[0]);
			realBoxObject.wasAttack = false;
			enemy.animationObject = enemy_stand;
			enemy.animationObject.step = 13;
			enemy.animationObject.setShadow({});
			enemyTimer = new Date();
		}
	}
}

function buildArrObjects(obj, startX, startY, count) {
	let arr = [];
	let rand;
	for (let i = 0; i < count; i++) {
		rand = math.random(0, obj.length - 1);
		arr[i] = game.newImageObject(obj[Number(rand)]);
		arr[i].setPosition(point(startX + (obj[rand].defaultWidth - 1) * i, startY));
	}
	return arr;
}

function getCollisionBlocks(obj = realBoxObject) {
	let collisionBlocks = [];

	floor.forEach((i) => OOP.forArr(i, (b) => {
		if (obj.getDistance(b.getPositionC()) < 170) {
			collisionBlocks.push(b); //optimize for collisions
		}
	}));

	return collisionBlocks;
}

///////////////////////////////
// USERS VARIABLES
///////////////////////////////

let crossPlaces = [];
let parallax = 80;
let parallax_arr = [];
let volume = 1;
let hardcority = 1; //[1-5]
let fpsCheck = false;
let menuOpened = true;
let checkHit = false;
let enemyTimer;
let hpbar = game.newRoundRectObject({
	x: camera.getPosition().x + 20, y: camera.getPosition().y + height - 100,
	w: realBoxObject.maxHP * 2 + 25, h: 40,
	radius: 20,
	fillColor: 'black'
});
let hpbarBackground = game.newRoundRectObject({
	x: camera.getPosition().x + 25, y: camera.getPosition().y + height - 105,
	w: realBoxObject.maxHP * 2 + 15, h: 40 - 10,
	radius: 15,
	fillColor: 'white'
});
let hpbarHP = game.newRoundRectObject({
	x: camera.getPosition().x + 25, y: camera.getPosition().y + height - 105,
	w: realBoxObject.HP * 2 - 10, h: 40 - 10,
	radius: 15,
	fillColor: 'red'
});
let textHealth = game.newTextObject({
	w: 70, h: 25,
	fillColor: '#000000',
	text: "HEALTH",
	size: 14,
	padding: 2,
	color: "white",
	style: 'bold'
});


realBoxObject.animationObject = player_stand;
enemy_army.map((enemy) => enemy.initBrowsing());
pjs.system.initFullPage();
hpbar.setShadow(obj.shadow[0]);
textHealth.setShadow(obj.shadow[0]);
player_stand.setShadow(obj.shadow[0]);
player_run.setShadow(obj.shadow[0]);
player_jump.setShadow(obj.shadow[0]);
player_defense.setShadow(obj.shadow[0]);
player_attack.setShadow(obj.shadow[0]);
pjs.system.setTitle('PointJS Game'); // Set Title for Tab or Window
OOP.fillArr(parallax_arr, 750, (i) => {
	let size = math.random(4, 15);
	return game.newRectObject({
		w: size, h: size,
		fillColor: '#e9e9e9',
		strokeColor: '#aaa',
		strokeWidth: 1,
		userData: {
			z: math.random(1, 80),
			fixY: math.random(-120, game.getWH().h + 140),
			fixX: math.random(0, 9000)
		}
	})
});


///////////////////////////////
// GAME CONSTRUCTOR
///////////////////////////////

game.newLoopFromConstructor('myGame', function () {
	// Constructor Game Loop*

	//menu
	let menu = system.newDOM('div');
	menu.className = 'menu';
	menu.innerHTML = `
			<ul class="main-menu">
				<h1>Welcome!</h1>
				<li class="item">Resume</li>
				<li class="item">New Game</li>
				<li class="item">Settings</li>
				<li class="item">About.</li>
			</ul>
			<div class="settings hide">
				<h1>Settings:</h1>
				<div class="option">
					<span>Check FPS:</span> 					 
					<div id="initFPS" class="optionCell"></div>
				</div>
				<div class="option">
					<span id="hardcoritystate">Hardcority():</span> 
					<input class="range" id="hardcority" type="range" min="1" max="5" step="1">
				</div>
				<div class="option">
					<span>Volume:</span> 
					<input class="range" id="volume" type="range" min="0.01" max="1" step="any">
				</div>
				<div class="item">Back</div>
			</div>
			<div class="about hide">
				<h1>About:</h1>	
				<figure class="controls">
					<figcaption>Move:</figcaption>
					<img src="img/menu/controls%20wasd.png" alt="wasd">
				</figure>		
				<figure class="controls">
					<figcaption>Combo:</figcaption>
					<img src="img/menu/attack_123.png" alt="123">
				</figure>	
				<figure class="controls">
					<figcaption>Defense:</figcaption>
					<img src="img/menu/defense.png" alt="space">
				</figure>	
				<div class="info">
					<div>
						<p>Created by <b>Saiko Andrei.</b></p>
						<p>Powered by <b>PointJS.</b></p>
						<a href="https://dev-prj.000webhostapp.com/" target="_blank">My site</a>
						<p>Special Thanks To <b>SkanerSoft.</b></p>						
					</div>					
				</div>
				<div class="item">Back</div>
			</div>
		`;

	menu.addEventListener('click', (target) => {

		if (target.target.innerText === 'Resume') {
			menu.classList.toggle('hide');
			game.resume();
			target.stopPropagation();
		}

		if (target.target.innerText === 'New Game') {
			system.restart();
			target.stopPropagation();
		}

		if (target.target.innerText === 'Settings') {
			let statement = ['Difficulty: <b>easy<b>', 'Difficulty: <b>beneath medium<b>', 'Difficulty: <b>medium<b>', 'Difficulty: <b>very  hot<b>', 'Difficulty: <b>heavy sh*t<b>'];
			document.querySelector('.main-menu').classList.toggle('hide');
			document.querySelector('.settings').classList.toggle('hide');
			if (fpsCheck) document.querySelector('#initFPS').classList.add('checked');
			document.querySelector('#hardcority').value = hardcority;
			document.querySelector('#hardcoritystate').innerHTML = statement[(hardcority || 3) - 1];
			document.querySelector('#volume').value = volume || 1;
			document.querySelector('#hardcority').onchange = function () {
				hardcority = document.querySelector('#hardcority').value;
				realBoxObject.attack = 0.8 + (8 / (hardcority * 10));
				pjs.memory.local.save('hardcority', hardcority);
				document.querySelector('#hardcoritystate').innerHTML = statement[hardcority - 1];
			}
			document.querySelector('#volume').onchange = function () {
				volume = document.querySelector('#volume').value;
				for (let key in obj.sounds)
					obj.sounds[key].volume = volume;
				pjs.memory.local.save('volume', volume);
			}
		}

		if (target.target.innerText === 'About.') {
			document.querySelector('.main-menu').classList.toggle('hide');
			document.querySelector('.settings').classList.add('hide');
			document.querySelector('.about').classList.toggle('hide');
		}

		if (target.target.id === 'initFPS') {
			if (fpsCheck) {
				target.target.classList.remove('checked');
				fpsCheck = false;
				pjs.memory.local.save('checkFPS', false);
			} else {
				system.initFPSCheck();
				target.target.classList.add('checked');
				fpsCheck = true;
				pjs.memory.local.save('checkFPS', true);
			}
		}

		if (target.target.innerText === 'Back') {
			document.querySelector('.main-menu').classList.remove('hide');
			document.querySelector('.settings').classList.add('hide');
			document.querySelector('.about').classList.add('hide');
		}

	});

	if (pjs.memory.local.load('checkFPS') === 'true') {
		system.initFPSCheck();
		fpsCheck = true;
	}

	if (pjs.memory.local.load('hardcority') !== null) {
		hardcority = Number(pjs.memory.local.load('hardcority'));
		realBoxObject.attack = 0.8 + (8 / (hardcority * 10));
	} else {
		hardcority = 3;
		realBoxObject.attack = 1.0;
	}

	if (pjs.memory.local.load('volume') !== null) {
		volume = Number(pjs.memory.local.load('volume'));
		for (let key in obj.sounds) {
			obj.sounds[key].volume = volume;
		}
	} else {
		volume = 1;
		for (let key in obj.sounds)
			obj.sounds[key].volume = volume;
	}

///////////////////////////////
// GAME LOOP
///////////////////////////////

	this.update = function () {
		// Update function
		game.clear(); // clear screen
		//init camera movement
		camera.follow(realBoxObject);

		if (obj.sounds.bgMusic.paused) obj.sounds.bgMusic.play();

		// if (document.querySelector('#counter') !== null) document.querySelector('#counter').innerText = progressLoading;


		//call menu
		if (key.isPress('ESC')) {
			menuOpened = true;
			menu.classList.toggle('hide');
			game.stop();
		}

		//draw
		if (potions.length > 0) {//drink potion healing
			let i = -1;
			potions.forEach((potion) => {
				i++;
				if (potion.isInCameraStatic()) potion.draw();
				if (realBoxObject.isIntersect(potion)) {
					obj.sounds.healingPotion.play();
					realBoxObject.HP += 20;
					if (realBoxObject.HP > realBoxObject.maxHP) realBoxObject.HP = realBoxObject.maxHP;
					potions.splice(i, 1);
				}
			});
		}
		if (gem.length > 0) {//get gem
			let i = -1;
			gem.forEach((item) => {
				i++;
				if (item.isInCameraStatic()) item.draw();
				if (realBoxObject.isIntersect(item)) {
					obj.sounds.healingPotion.play();
					realBoxObject.maxHP += 30;
					gem.splice(i, 1);
				}
			});
		}
		OOP.forArr(parallax_arr, function (i) { //parallax
			if (realBoxObject.HP > 0) {
				i.x = (i.fixX - (camera.getPosition().x * i.z / parallax));
				i.y = (i.fixY - (camera.getPosition().y * i.z / parallax));
			} else {
				i.x = (i.fixX - mouse.getPosition().x * i.z / parallax);
				i.y = (i.fixY - mouse.getPosition().y * i.z / parallax);
			}
			if (i.isInCameraStatic()) i.draw();
		});
		floor.forEach((arr) => { //floor
			OOP.forArr(arr, (i) => {
				if (i.isInCameraStatic()) i.draw();
			});
		});
		environment.forEach((i) => {
			i.forEach(arr => {
				if (arr.isInCameraStatic()) arr.draw();
			})
		});
		if (house.isInCameraStatic()) house.draw();
		if (castle.isInCameraStatic()) castle.draw();
		if (myText.isInCameraStatic()) myText.draw();
		if (fpsCheck) { //fps
			brush.drawText({
				text: 'FPS: ' + system.getFPS(),
				color: 'red',
				size: 30,
				x: camera.getPosition().x,
				y: camera.getPosition().y
				// x: player_stand.x - width / 2 + 100,
				// y: player_stand.y - height / 2 + 100
			});
		}

		//test on death enemy
		for (let i = 0; i < enemy_army.length; i++)
			if (enemy_army[i].HP <= 0) {
				crossPlaces.push(game.newImageObject(obj.environment.cross));
				crossPlaces[crossPlaces.length - 1]
					.setPosition(point(enemy_army[i].getPosition().x, enemy_army[i].getPosition().y + 115));
				crossPlaces.push(game.newImageObject(obj.environment.bones));
				crossPlaces[crossPlaces.length - 1]
					.setPosition(point(enemy_army[i].getPosition().x - 5, enemy_army[i].getPosition().y + 145));
				enemy_army.splice(i, 1);
				realBoxObject.keyAccess = true;
				obj.sounds.soundDeathSkilet.play();
				break;
			}

		//collisions
		pjs.vector.moveCollision(realBoxObject, getCollisionBlocks().concat(enemy_army).concat(house).concat(castle), realBoxObject.player_speed); //for player

		if (enemy_army.length > 0) //for army of enemies
			enemy_army.forEach((enemy) => {

				enemy.animationObject.setPosition(point(enemy.getPosition().x - 40, enemy.getPosition().y));
				if (enemy.animationObject == enemy_attack)
					enemy.animationObject.setPosition(point(enemy.getPosition().x - 95, enemy.getPosition().y - 10));

				//realize patrol method
				if ((Math.abs(enemy.x - enemy.basePosition) > enemy.area_browsing) && enemy.isBrowsing) {
					enemy.speed.x = (enemy.x < enemy.basePosition) ?
						(Math.random() * (3 - 1) + 1) : -(Math.random() * (3 - 1) + 1);
					if (enemy.speed.x < 0) {
						enemy.animationObject = enemy_run;
						enemy.animationObject.step = 9;
						enemy.animationObject.setFlip(true, false);
					} else {
						enemy.animationObject = enemy_run;
						enemy.animationObject.step = 9;
						enemy.animationObject.setFlip(false, false);
					}
				}

				//reaction on hero
				if ((Math.abs(enemy.x - realBoxObject.x) < 350) && !enemy.isInitFight) {
					enemy.initBrowsing(false);
					enemy.basePosition = enemy.x;
					enemy.animationObject.setFlip(true, false);
					if (Math.abs(enemy.x - realBoxObject.x) > 150) {
						if (Math.abs(enemy.x - realBoxObject.x) < 154) {
							enemy.speed.x = 0;
							realBoxObject.keyAccess = false;
							enemy.isInitFight = true;
							realBoxObject.animationObject.setFlip(false, false);
							player_defense.setFlip(false, false);
							enemy_stand.setPosition(point(enemy.getPosition().x - 40, enemy.getPosition().y));
							enemy.animationObject = enemy_stand;
							enemy.animationObject.step = 10;
							enemy.animationObject.setFlip(true, false);
							enemy.x = realBoxObject.x + 150;
							enemyTimer = new Date();
							realBoxObject.playerTimer = new Date();
							realBoxObject.isInitFight = true;
						}
						else enemy.speed.x = -1;
						pjs.vector.moveCollisionAngle(enemy, getCollisionBlocks(enemy), enemy.speed.x);
					}
				}

				if (realBoxObject.HP > 0) fightingSystemOfEnemy(enemy);
				if (enemy.isInitFight && realBoxObject.HP > 0) fightingSystemOfPlayer(enemy);

				pjs.vector.moveCollision(enemy, getCollisionBlocks(enemy), enemy.speed);
				if ((enemy.isInitFight) && (enemy.animationObject == enemy_attack)) enemy.animationObject.drawToFrame(4);
				else if (enemy.isInCameraStatic())
					enemy.animationObject.draw();

				//draw enemy HPbar
				brush.drawRect({
					x: enemy.x + (enemy.w / 3) - enemy.maxHP * 2, y: enemy.y - 40,
					w: enemy.maxHP * 3, h: 10,
					fillColor: 'black'
				});
				//draw enemy HP
				brush.drawRect({
					x: enemy.x + (enemy.w / 3) - enemy.maxHP * 2 + 3, y: enemy.y - 38,
					w: enemy.HP * 3 - 6, h: 6,
					fillColor: 'white'
				});

				if (traps.length > 0) {//perform trap
					let i = -1;
					traps.forEach((trap) => {
						i++;
						trap.draw();
						if (realBoxObject.isIntersect(trap)) {
							obj.sounds.pain.play();
							realBoxObject.HP -= 20;
							traps.splice(i, 1);
						}
						if (enemy.isIntersect(trap)) {
							obj.sounds.pain.play();
							enemy.HP -= 20;
							traps.splice(i, 1);
						}
					});
				}
			});


		//init player MOVEMENT
		if (key.isDown('D') && realBoxObject.keyAccess) {
			player_stand.setFlip(false, false);
			player_run.setFlip(false, false);
			player_jump.setFlip(false, false);
			player_defense.setFlip(false, false);
			if (realBoxObject.startJump - 5 < realBoxObject.getPosition().y && !key.isDown('W')) {
				realBoxObject.animationObject = player_run;
				realBoxObject.animationObject.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y));
				realBoxObject.animationObject.draw();
			}
			realBoxObject.player_speed.x = obj.characters[0].speed + 0.5;
		}
		else if (key.isDown('A') && realBoxObject.keyAccess) {
			player_stand.setFlip(true, false);
			player_run.setFlip(true, false);
			player_jump.setFlip(true, false);
			player_defense.setFlip(true, false);
			if (realBoxObject.startJump - 5 < realBoxObject.getPosition().y && !key.isDown('W')) {
				realBoxObject.animationObject = player_run;
				realBoxObject.animationObject.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y));
				realBoxObject.animationObject.draw();
			}
			realBoxObject.player_speed.x = -(obj.characters[0].speed + 0.5);
		}
		else {
			floor[0].forEach((elem) => {
				if (!elem.isInCameraStatic() || (Math.abs(elem.getPosition().x - realBoxObject.getPosition().x) > 150)) return;
				if (elem.isIntersect(realBoxObject)) {
					if (realBoxObject.playerBlocked) {
						realBoxObject.animationObject = player_defense;
						realBoxObject.animationObject.setPosition(point(realBoxObject.getPosition().x - 30, realBoxObject.getPosition().y + 5));
					}
					else if (realBoxObject.animationObject === player_attack) {
						realBoxObject.animationObject.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y));
					} else {
						player_stand.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y + 5));
						realBoxObject.animationObject.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y + 5));
						realBoxObject.animationObject = player_stand;
					}
					if (realBoxObject.playerBlocked && (realBoxObject.HP > 0))
						realBoxObject.animationObject.drawToFrame(3);
					else if (realBoxObject.animationObject === player_attack) realBoxObject.animationObject.drawToFrame(3);
					else if (realBoxObject.HP > 0) realBoxObject.animationObject.draw();
				}
			});
			realBoxObject.player_speed.x = 0;
		}
		if (key.isDown('W') && realBoxObject.keyAccess) {
			if (realBoxObject.startJump - 175 > realBoxObject.getPosition().y) realBoxObject.player_speed.y = 5;
			floor[0].forEach((elem) => {
				if (!elem.isInCameraStatic() || (Math.abs(elem.getPosition().x - realBoxObject.getPosition().x) > 150)) return;
				if (elem.isIntersect(realBoxObject)) {
					realBoxObject.startJump = realBoxObject.getPosition().y;
					realBoxObject.player_speed.y = -obj.characters[0].speed * 2;
				} else {
					realBoxObject.animationObject = player_jump;
					realBoxObject.animationObject.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y));
					realBoxObject.animationObject.draw();
				}
			});
		}
		else {
			realBoxObject.player_speed.y = 6;
			if (realBoxObject.startJump - 3 > realBoxObject.getPosition().y) {
				realBoxObject.animationObject = player_jump;
				realBoxObject.animationObject.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y));
				realBoxObject.animationObject.draw();
			}
		}

		//realize block system
		if (key.isPress('SPACE')) {
			if (!realBoxObject.playerBlocked) {
				let time = new Date();
				if (time - realBoxObject.playerBlockTimer > realBoxObject.playerBlockDuration) {
					realBoxObject.playerBlocked = true;
					realBoxObject.playerBlockTimer = time;
				}
			} else {
				let time = new Date();
				if (time - realBoxObject.playerBlockTimer < realBoxObject.playerBlockDuration)
					realBoxObject.playerBlocked = false;
			}
		} else {
			let time = new Date();
			if (realBoxObject.playerBlocked && (time - realBoxObject.playerBlockTimer > realBoxObject.playerBlockDuration))
				realBoxObject.playerBlocked = false;
		}

		//if player had have died
		if (realBoxObject.HP <= 0) {
			if (realBoxObject.isInitFight) obj.sounds.soundDeathHero.play();
			player_died.setPosition(point(realBoxObject.getPosition().x - 40, realBoxObject.getPosition().y + 10));
			realBoxObject.animationObject = player_died;
			realBoxObject.animationObject.drawToFrame(3);
			realBoxObject.keyAccess = false;
			realBoxObject.isInitFight = false;
		}

		if (crossPlaces.length > 0) {
			crossPlaces.forEach((i) => {
				if (i.isInCameraStatic()) i.draw();
			});
		}

		if (gold[0].isInCameraStatic()) gold[0].draw();

		if (realBoxObject.isIntersect(gold[0])) {
			realBoxObject.keyAccess = false;
			brush.drawRect({
				x: realBoxObject.x + 10, y: realBoxObject.y - 80,
				w: 200, h: 50,
				fillColor: 'black'
			});
			brush.drawText({
				text: 'You Winner!',
				x: realBoxObject.x + 30, y: realBoxObject.y - 70,
				color: "white",
				style: 'bold',
				size: 30
			});

		}

		//layer of hpbar
		hpbar.x = camera.getPosition().x + 90;
		hpbar.y = camera.getPosition().y + game.getWH().h - 100;
		hpbar.w = realBoxObject.maxHP * 2 + 25;
		hpbar.draw();
		textHealth.x = camera.getPosition().x + 103;
		textHealth.y = camera.getPosition().y + game.getWH().h - 60;
		textHealth.draw();
		hpbarBackground.x = camera.getPosition().x + 95;
		hpbarBackground.y = camera.getPosition().y + game.getWH().h - 95;
		hpbarBackground.w = realBoxObject.maxHP * 2 + 15;
		hpbarBackground.draw();
		if (realBoxObject.HP > 0) {
			hpbarHP.x = camera.getPosition().x + 95;
			hpbarHP.y = camera.getPosition().y + game.getWH().h - 95;
			hpbarHP.w = realBoxObject.HP * 2 + 15;
			hpbarHP.draw();
		}


	};

	this.entry = function () { // optional
		log('myGame is started');
	};

	this.exit = function () { // optional
		log('myGame is stopped');
	};

});

game.startLoop('myGame');
game.stop();

///////////////////////////////
// POSTLOADS
///////////////////////////////

// window.onload = function() {
// bgMusic = new Audio('audio/Danger.mp3');
// soundAttackSword1 =  new Audio('audio/attack-sword1.mp3');
// soundAttackSword = new Audio('audio/attack-sword.mp3');
// soundAttackSwordBlock = new Audio('audio/attack-sword-block.mp3');
// soundDeathSkilet = new Audio('audio/death-skilet.mp3');
// soundDeathHero = new Audio('audio/death-hero.mp3');
// bgMusic.play();
// }

