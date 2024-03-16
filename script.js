document.addEventListener("DOMContentLoaded", function () {
  menu();
});

function menu() {
  gameContainer.style.display = "none";
  addTitle();
  addDescription();
  hideLoading();
  const pokemonBallImages = document.querySelectorAll(".pokemon-ball");
  pokemonBallImages.forEach((el) => {
    el.addEventListener("click", (e) => {
      document.querySelector(".Allpokeballs").remove();
      fetchRandomPokemon();
      // Remove the event listeners from Pokémon ball images
      pokemonBallImages.forEach((el) => {
        el.removeEventListener("click", e);
      });
    });
  });
}
let startBtnCreated = false;
let changeBtnCreated = false;

function fetchRandomPokemon() {
  showLoading();
  changeDescriptionText();
  const pokemonBallImages = document.getElementsByClassName("pokemon-ball");
  for (let i = 0; i < pokemonBallImages.length; i++) {
    pokemonBallImages[i].style.display = "none";
  }
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
  const randomPokemonId = Math.floor(Math.random() * 898) + 1;

  fetch(apiUrl + randomPokemonId)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon.");
      }
      return response.json();
    })
    .then((data) => {
      const existingPokemonImage = document.getElementById("pokemonImage");
      const newPokemonImage = document.createElement("img");
      newPokemonImage.id = "pokemonImage";
      newPokemonImage.src = data.sprites.front_default;
      newPokemonImage.style.display = "inline-block";
      if (existingPokemonImage) {
        existingPokemonImage.parentNode.replaceChild(
          newPokemonImage,
          existingPokemonImage
        );
      } else {
        meunContainer.appendChild(newPokemonImage);
      }

      if (!startBtnCreated) {
        setTimeout(addStartBtn, 500);
        choosePoken();
        startBtnCreated = true;
      }

      hideLoading();
    })
    .catch((error) => {
      console.log("Error:", error);
      hideLoading();
    });
}
function addTitle() {
  const titleContainer = document.querySelector(".title");
  const title = document.createElement("h1");
  title.textContent = "Flappy Pokemon";
  title.className = "title";
  titleContainer.appendChild(title);
}

function addDescription() {
  const descriptionContainer = document.querySelector(".description");
  const content = document.createElement("p");
  content.textContent = "choose a Pokemon ball";
  content.className = "description";
  descriptionContainer.appendChild(content);
}
function changeDescriptionText() {
  const description = document.querySelector(".description");
  description.textContent = "Choose your favorite Pokemon";
}
function choosePoken() {
  const meunContainer = document.getElementById("meunContainer");

  if (!changeBtnCreated) {
    const chooseBtn = document.createElement("button");
    chooseBtn.className = "ChooseBtn";
    meunContainer.appendChild(chooseBtn);
    chooseBtn.id = "fetchAgain";

    chooseBtn.addEventListener("click", () => {
      fetchRandomPokemon();
    });

    changeBtnCreated = true;
  }
}
function addStartBtn() {
  const startBtn = document.createElement("button");
  startBtn.className = "button";
  startBtn.textContent = "START";
  startBtn.id = "fetchAgain";
  meunContainer.appendChild(startBtn);

  startBtn.addEventListener("click", () => {
    // Clear the existing content
    gameContainer.style.display = "block";
    meunContainer.style.display = "none";

    // Call the new function
    game();
  });
}
// switch
let isMenuVisible = true;
function toggleMenu() {
  if (isMenuVisible) {
    menuContainer.style.display = "none"; // Hide the menu container
    gameContainer.style.display = "block"; // Show the game container
  } else {
    menuContainer.style.display = "block"; // Show the menu container
    gameContainer.style.display = "none"; // Hide the game container
  }
}
// Game function
function game() {
  //Container
  const container = document.getElementById("container");
  const containerHeight = 580;
  const containerWidth = 360;
  container.style.height = containerHeight + "px";
  container.style.width = containerWidth + "px";

  //Pokemon
  const pokemon = document.getElementById("pokemonImage");
  pokemon.style.position = "absolute";
  pokemon.height = containerHeight / 16;
  pokemon.width = containerWidth / 9;
  container.appendChild(pokemon);
  pokemon.id = "fetchAgain";
  //Pokemon default position
  pokemon.style.left = containerWidth / 8 + "px"; //pokemonX
  let pokemonPositionY = containerHeight / 2;
  pokemon.style.top = pokemonPositionY + "px"; //pokemonY

  //Pipe
  const pipeWidth = 35;
  const opening = containerHeight / 4;
  let pipeTopArray = [];
  let pipeBottomArray = [];

  //Constant number
  const jumping = 40; //pokemon jump height
  const gravity = 1; //If nothing press, Pokemon fall down as gravity
  const moving = -2; //Pipe moving speed

  //Status
  let gameStatus = true;
  let downing; //Function setInterval

  //Score
  let score = 0;
  const scoreCount = document.querySelector("#score");
  scoreCount.textContent = score;

  move();
  setInterval(createPipe, 1800);
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
      containerHeight / 5 -
      Math.random() * (containerHeight / 2);

    //Pipe default position

    const pipeTop = document.createElement("div");
    pipeTop.style.backgroundImage = "url('toppipe.png')";
    pipeTop.style.backgroundSize = "100% 100%";
    pipeTop.className = "pipe";
    pipeTop.style.top = 0 + "px";
    pipeTop.style.left = containerWidth + "px";
    pipeTop.style.width = pipeWidth + "px";
    pipeTop.style.height = randomPipe + "px";
    container.appendChild(pipeTop);
    pipeTopArray.push(pipeTop);

    const pipeBottom = document.createElement("div");
    pipeBottom.style.backgroundImage = "url('bottompipe.png')";
    pipeBottom.style.backgroundSize = "100% 100%";
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

        score += 1;
        scoreCount.textContent = score;
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
    for (let i = 0; i < pipeBottomArray.length; i += 2) {
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

    const endSumUpP = document.createElement("p");
    endSumUpP.className = "endSumUpP";
    endSumUpP.textContent = `You got ${score} score! Try again.`;
    container.appendChild(endSumUpP);

    const startBtn = document.createElement("button");
    startBtn.className = "startBtn";
    startBtn.textContent = "Start";
    container.appendChild(startBtn);

    startBtn.addEventListener("click", function () {
      console.log("restart");
      window.location.reload();
    });
  }
}

// Loading
function showLoading() {
  const loading = document.getElementById("loading");
  loading.style.display = "block";
}

function hideLoading() {
  const loading = document.getElementById("loading");
  loading.style.display = "none";
}
