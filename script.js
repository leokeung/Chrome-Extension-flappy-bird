// Function to select a random Pokemon
function selectRandomPokemon() {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  // Generate a random Pokemon ID (1 to 898)
  const randomPokemonId = Math.floor(Math.random() * 898) + 1;

  // Fetch data from the API for the random Pokemon
  fetch(apiUrl + randomPokemonId)
    .then((response) => response.json())
    .then((data) => {
      const pokemonImage = document.getElementById("pokemonImage");
      const pokemonBallImages = document.getElementsByClassName("pokemon-ball");

      // Hide all the Pokemon ball images
      for (let i = 0; i < pokemonBallImages.length; i++) {
        pokemonBallImages[i].style.display = "none";
      }

      // Display the random Pokemon image
      pokemonImage.src = data.sprites.front_default;
      pokemonImage.style.display = "block";
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
