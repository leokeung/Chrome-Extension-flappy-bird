document.addEventListener("DOMContentLoaded", function () {
  setGame();
});

function menu() {}
function fetchP() {
  //Fetch pokemon API to get icons
}
function chooseP() {
  //Choose one Pokemon from 3-5?
}

//Container
const container = document.getElementById("container");
const containerHeight = 640;
const containerWidth = 360;
container.style.height = containerHeight + "px";
container.style.width = containerWidth + "px";

//Pokemon
const pokemon = document.getElementById("pokemon");
pokemon.height = containerHeight / 16;
pokemon.width = containerWidth / 9;

//Pokemon default position
pokemon.style.position = "relative";
pokemon.style.left = containerWidth / 8 + "px"; //pokemonX
pokemon.style.top = containerHeight / 2 + "px"; //pokemonY

//Count position by jumping
//Pokemon axis-x remain unchange, only axis-y change when press 'space'
let pokemonPosition = containerHeight / 2;

//Pipe
/* const pipe = document.querySelectorAll('.pipe')
pipe.forEach(el => el.width = '45');
let pipeHeight; */

//Constant number
const jumping = 40; //pokemon jump height
const gravity = 0.4; //If nothing press, Pokemon fall down as gravity
const moving = -2; //Pipe moving speed

//Status
let gameStatus = true;
let score = 0;
let downing; //Function setInterval

function game() {
  move();
}
game();

//Movement in game
function move() {
  if (!gameStatus) {
    return;
  }
  //Pokemon jump
  document.body.addEventListener("keypress", keypress);

  //Apply gravity to Pokemon
  downing = setInterval(function () {
    pokemonPosition += gravity;
    pokemon.style.top = pokemonPosition + "px";
    detect(pokemonPosition);
  }, 10);
}

//Press 'space' or 'x' to jump
function keypress(e) {
  if (e.key == "x" || e.key == "X" || e.code == "Space") {
    pokemonPosition -= jumping;
    pokemon.style.top = pokemonPosition;
  }
}

//Press up, icon face-up
//Press release, icon face-return

//Define gameover
function detect(pokemonPosition) {
  console.log(pokemonPosition); //Test
  //Pokemon out of container
  if (
    pokemonPosition + pokemon.width > containerHeight ||
    pokemonPosition < 0
  ) {
    gameover();
  }
  //Pokemon hit pipe
}

//Gameover message
function gameover() {
  console.log("game over!");
  gameStatus = false;
  clearInterval(downing);
  document.body.removeEventListener("keypress", keypress);
  return;
}

function afterGame() {
  //Fetch'facts' API to show facts
  //Return menu button
  //Chose another pokemon button
  //Resatrt with same pokemon button
}

//Pipe
const pipe = document.querySelectorAll(".pipe");
pipe.forEach((el) => (el.width = "45"));
let pipeHeight;
let pipeArray = [];

//Create each set of pipe
function createPipe() {
  //Create pipe by random height
}

//Place pipes to game by for-loop
function placePipe() {
  //Clear pipe after screen
}

function advanceMode() {
  //if score to some points, next level. Change background / Pokemon / Pipe / Speed / Opening
}

function cheatMode() {
  //No pipe mode
}
