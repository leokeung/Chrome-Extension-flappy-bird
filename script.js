document.addEventListener("DOMContentLoaded", function() {
  menu();

});

function menu() {
  addTitle();
  addStartBtn();
  /* const container = document.getElementById('container'); */
  const pokemonBallImages = document.querySelectorAll('.pokemon-ball');
  pokemonBallImages.forEach(el => {
    el.addEventListener('click', e => {
      document.querySelector('.Allpokeballs').remove();
      fetchRandomPokemon();

    })
  })
}

// Function to select a random Pokemon
function fetchRandomPokemon() {
  // Hide all the Pokemon ball images
  const pokemonBallImages = document.getElementsByClassName('pokemon-ball');
  /* pokemonBallImages.innreHTML = ''; */
  for (let i = 0; i < pokemonBallImages.length; i++) {
    pokemonBallImages[i].style.display = "none";
    
    
  }


  const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  // Generate a random Pokemon ID (1 to 898)
  const randomPokemonId = Math.floor(Math.random() * 898) + 1;

  // Fetch data from the API for the random Pokemon
  fetch(apiUrl + randomPokemonId)
    .then((response) => response.json())
    .then((data) => {
      // Display the random Pokemon image
      const pokemonImage = document.createElement("img");
      pokemonImage.id = 'pokemonImage';
      pokemonImage.src = data.sprites.front_default;
      pokemonImage.style.display = "inline-block";
      container.appendChild(pokemonImage);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

//add title to the container
function addTitle() {
  const titleContainer = document.querySelector(".title");
  const title = document.createElement('h1');
  title.textContent = "Flappy Pokemon";
  title.className = 'title';
  titleContainer.appendChild(title);
}

//Create Start btn
function addStartBtn() {
  const startBtn = document.createElement('button');
  startBtn.className = 'button';
  startBtn.textContent = 'START';

  container.appendChild(startBtn);
}

//pick pokemon first (start button no show yet)
//show "Pick your pokemon"
//after click the pokeballs, show the pokemon image
//now show the START button
