document.addEventListener("DOMContentLoaded", function () {
  game();
});

function game() {
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

  pokemon.style.left = containerWidth / 8 + "px"; //pokemonX
  pokemon.style.top = containerHeight / 2 + "px"; //pokemonY

  //Count position by jumping
  //Pokemon axis-x remain unchange, only axis-y change when press 'space'
  let pokemonPositionY = containerHeight / 2;

  //Pipe
  const pipeWidth = 64;
  const opening = containerHeight / 4;
  let pipeTopArray = [];
  let pipeBottomArray = [];

  //Constant number
  const jumping = 40; //pokemon jump height
  const gravity = 0.4; //If nothing press, Pokemon fall down as gravity
  const moving = -2; //Pipe moving speed

  //Status
  let gameStatus = true;
  let score = 0;
  let downing; //Function setInterval

  move();
  setInterval(createPipe, 1500);
  requestAnimationFrame(placePipe);

  //Movement in game
  function move() {
    if (!gameStatus) {
      return;
    }

    //Pokemon jump
    document.body.addEventListener("keypress", keypress);

    //Apply gravity to Pokemon
    downing = setInterval(function () {
      pokemonPositionY += gravity;
      pokemon.style.top = pokemonPositionY + "px";
    }, 10);
  }

  //Press 'space' or 'x' to jump
  function keypress(e) {
    if (e.key == "x" || e.key == "X" || e.code == "Space") {
      pokemonPositionY -= jumping;
      pokemon.style.top = pokemonPositionY;
    }
  }

  //Create each set of pipe
  function createPipe() {
    if (!gameStatus) {
      return;
    }
    //Create pipe by random height
    let randomPipe =
      containerHeight -
      containerHeight / 3 -
      Math.random() * (containerHeight / 2);

    //Pipe default position
    const pipeTop = document.createElement("div");
    pipeTop.className = "pipe";

    pipeTop.style.top = 0 + "px";
    pipeTop.style.left = containerWidth + "px";
    pipeTop.style.width = pipeWidth + "px";
    pipeTop.style.height = randomPipe + "px";
    container.appendChild(pipeTop);
    pipeTopArray.push(pipeTop);

    const pipeBottom = document.createElement("div");
    pipeBottom.className = "pipe";

    pipeBottom.style.bottom = "0" + "px";
    pipeBottom.style.left = containerWidth + "px";
    pipeBottom.style.width = pipeWidth + "px";
    pipeBottom.style.height = containerHeight - randomPipe - opening + "px";
    container.appendChild(pipeBottom);
    pipeBottomArray.push(pipeBottom);
  }

  //Place pipes to game by for-loop
  function placePipe() {
    requestAnimationFrame(placePipe);
    if (!gameStatus) {
      return;
    }

    for (let i = 0; i < pipeTopArray.length; i++) {
      let pipeTop = pipeTopArray[i];
      let pipeBottom = pipeBottomArray[i];
      let pipeX = parseFloat(pipeBottom.style.left);
      pipeX += moving;
      pipeTop.style.left = pipeX + "px";
      pipeBottom.style.left = pipeX + "px";

      //Clear pipe after screen
      if (pipeBottomArray.length > 0 && pipeX < 0) {
        pipeTop.remove();
        pipeBottom.remove();
        pipeTopArray.splice(i, 1);
        pipeBottomArray.splice(i, 1);
        i--;
      }

      //Define gameover
      detect(pokemonPositionY);
    }
  }

  function detect(pokemonPositionY) {
    //Pokemon out of container
    if (
      pokemonPositionY + pokemon.height > containerHeight ||
      pokemonPositionY < 0
    ) {
      gameover();
    }

    //Pokemon hit pipe
    for (let i = 0; i < pipeBottomArray.length; i++) {
      let pipeTop = pipeTopArray[i];
      let pipeBottom = pipeBottomArray[i];

      let pipeTopY = parseFloat(pipeTop.style.height); //pipeTopY
      let pipeBottomY = containerHeight - parseFloat(pipeBottom.style.height); //pipeBottomY
      let pipeX = parseFloat(pipeTop.style.left); //pipeX

      let pokemonTop = pokemonPositionY;
      let pokemonBottom = pokemonPositionY + pokemon.height;
      let pokemonX = parseFloat(pokemon.style.left);

      if (
        (pokemonTop < pipeTopY || pokemonBottom > pipeBottomY) &&
        pokemonX + pokemon.width > pipeX && //part of pokemon inside the pipe
        pokemonX < pipeX + pipeWidth // part of pokemon outside the pipe
      ) {
        gameover();
      }
    }
  }

  //Gameover message
  function gameover() {
    console.log("game over!");
    gameStatus = false;
    clearInterval(downing);
    document.body.removeEventListener("keypress", keypress);
  }

  function endGame() {
    //Fetch'facts' API to show facts
    //Return menu button
    //Chose another pokemon button
    //Resatrt with same pokemon button
  }
}
