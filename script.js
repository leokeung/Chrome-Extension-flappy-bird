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
let pokemonPositionY = containerHeight / 2;


//Pipe
const pipeWidth = 64;
const pipeHeight = 512;
const opening = containerHeight / 4;
let pipeArray = [];

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

  setInterval(createPipe, 1500)
  requestAnimationFrame(placePipe)
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
  downing = setInterval(function() {
    pokemonPositionY += gravity;
    pokemon.style.top = pokemonPositionY + "px";
    detect(pokemonPositionY);
  }, 10);



}

//Press 'space' or 'x' to jump
function keypress(e) {
  if (e.key == "x" || e.key == "X" || e.code == "Space") {
    pokemonPositionY -= jumping;
    pokemon.style.top = pokemonPositionY;
  }
}

//Press up, icon face-up
//Press release, icon face-return

//Create each set of pipe
function createPipe() {
  if (!gameStatus) {
    return;
  }
  //Create pipe by random height
  let randomPipe = containerHeight - containerHeight / 6 - Math.random() * (containerHeight / 2);

  //Pipe default position
  const pipeTop = document.createElement('div');
  pipeTop.className = 'pipe';
  pipeTop.style.position = 'absolute'
  pipeTop.style.top = 0 + 'px';
  pipeTop.style.left = containerWidth + 'px';
  pipeTop.style.width = pipeWidth + 'px';
  pipeTop.style.height = randomPipe + 'px';
  container.appendChild(pipeTop);
  pipeArray.push(pipeTop);

  const pipeBottom = document.createElement('div');
  pipeBottom.className = 'pipe';
  pipeBottom.style.position = 'absolute';
  pipeBottom.style.bottom = '0' + 'px';
  pipeBottom.style.left = containerWidth + 'px';
  pipeBottom.style.width = pipeWidth + 'px';
  pipeBottom.style.height = containerHeight - randomPipe - opening + 'px';
  container.appendChild(pipeBottom);
  pipeArray.push(pipeBottom);
}

//Place pipes to game by for-loop
function placePipe() {
  if (!gameStatus) {
    return;
  }
  requestAnimationFrame(placePipe)
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    let pipeX = parseInt(pipe.style.left);
    pipeX += moving;
    pipe.style.left = pipeX + 'px';

    //Clear pipe after screen
    if (pipeArray.length > 0 && parseFloat(pipe.style.left) < -pipeWidth) {
      pipeArray.shift();
      pipe.remove();
      i--;
    }

    console.log(pipeArray.length); //Test 
  }

}

//Define gameover
function detect(pokemonPositionY) {
  //Pokemon out of container
  if (
    pokemonPositionY + pokemon.height > containerHeight ||
    pokemonPositionY < 0
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

function endGame() {
  //Fetch'facts' API to show facts
  //Return menu button
  //Chose another pokemon button
  //Resatrt with same pokemon button
}


function advanceMode() {
  //if score to some points, next level. Change background / Pokemon / Pipe / Speed / Opening
}

function cheatMode() {
  //No pipe mode
}
