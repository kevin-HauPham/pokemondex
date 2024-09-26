const { pokemonData } = require("../../data/db/data");

function searchByIdController(req, res) {
  const pokemonId = parseInt(req.params.id, 10); // Get the Pokémon ID from the URL and convert it to a number

  if (isNaN(pokemonId)) {
    return res.status(400).json({ error: "Invalid Pokémon ID." });
  }

  const totalPokemons = pokemonData.length;

  // Find the Pokémon with the given ID
  const pokemon = pokemonData.find((pokemon) => pokemon.id === pokemonId);

  if (!pokemon) {
    return res
      .status(404)
      .json({ error: `Pokémon with ID ${pokemonId} not found.` });
  }

  // Use modular arithmetic to handle circular cases
  const pokemonIndex = pokemonData.findIndex(
    (pokemon) => pokemon.id === pokemonId
  );

  if (pokemonIndex === -1) {
    return res
      .status(404)
      .json({ error: `Pokémon with ID ${pokemonId} not found.` });
  }

  // Identify previous and next Pokémon based on index
  const previousPokemon =
    pokemonIndex === 0
      ? pokemonData[totalPokemons - 1]
      : pokemonData[pokemonIndex - 1]; // Previous Pokémon or null if it's the first
  const nextPokemon =
    pokemonIndex === totalPokemons - 1
      ? pokemonData[0]
      : pokemonData[pokemonIndex + 1];

  // Return the current Pokémon, and the previous and next Pokémon
  const response = {
    data: {
      previousPokemon: previousPokemon || null, // Return null if no previous Pokémon
      pokemon: pokemon, // The main Pokémon
      nextPokemon: nextPokemon || null, // Return null if no next Pokémon
    },

    totalPokemons: totalPokemons, // Total number of Pokémon
  };
  res.json({
    response,
  });
}
module.exports = searchByIdController;
