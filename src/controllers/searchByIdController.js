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
  const previousId = ((pokemonId - 2 + totalPokemons) % totalPokemons) + 1; // Previous Pokémon ID, circular
  const nextId = (pokemonId % totalPokemons) + 1; // Next Pokémon ID, circular

  const previousPokemon = pokemonData.find(
    (pokemon) => pokemon.id === previousId
  );
  console.log("pokemon", pokemon);
  const nextPokemon = pokemonData.find((pokemon) => pokemon.id === nextId);

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
