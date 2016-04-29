az = 0;
alt = 0;
gyroCompassOffset = 0;
gyroHeading = 0;
handleMotion = function(event) {
  var accuracy, compassHeading;
  gyroHeading = 360 - event.alpha;
  if (event.webkitCompassHeading && !compassHeading) {
	compassHeading = event.webkitCompassHeading + window.orientation;
	accuracy = event.webkitCompassAccuracy;
	gyroCompassOffset = compassHeading - gyroHeading;
  } else {
	gyroCompassOffset = 0;
  }
  az = gyroHeading + gyroCompassOffset;
  if (az > 360) az = az - 360;
  if (az < 0) az = 360 - az;
  if (Math.abs(event.beta - alt) > 0.05) {
	alt = event.beta + calibrateOffsetAlt;
	if (alt > 90) alt = 90 - alt;
	if (alt < -90) alt = 90 - (alt + 90);
  }
}
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', handleMotion);
}

//1. Setting up and starting Hexi

//An array of files you want to load
let thingsToLoad = ["img/earth.png"];

//Initialize and start Hexi
// windowWidth = 2048;
// windowHeight = 1536;
windowWidth = 400;
windowHeight = 800;
let g = hexi(windowWidth, windowHeight, setup, thingsToLoad, load);
g.fps = 30;
g.backgroundColor = 0x000000;
//g.scaleToWindow();
g.start();

//2. The `load` function that will run while your files are loading

function load(){

  //Display an optional loading bar
  // g.loadingBar();
}

//3. The `setup` function, which initializes your game objects, variables and sprites

let earth;

function setup() {

  //Create your game objects here

	earth = g.sprite("img/earth.png");
	earth.height = 100;
	earth.width = 100;
	earth.setPosition((windowWidth - 100)/ 2, (windowHeight - 100) / 2);
	earth.pivotX = 0.5;
	earth.pivotY = 0.5;

  //Set the game state to `play` to start the game loop
  g.state = play;
}

//4. The `play` function, which is your game or application logic that runs in a loop

acceleration = 1;

function play(){
  //This is your game loop, where you can move sprites and add your
  //game logic
  	acceleration += 0.01;
	earth.rotation += 0.01;
	earth.x += 1.8;
	earth.y += 1.3;
	earth.height += acceleration;
	earth.width += acceleration;
}