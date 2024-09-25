const { pokemonData } = require("../../data/db/data");

function searchByIdController(req, res) {
  const pokemonId = parseInt(req.params.id, 10); // Get the Pokémon ID from the URL and convert it to a number

  if (isNaN(pokemonId)) {
    return res.status(400).json({ error: "Invalid Pokémon ID." });
  }

  const totalPokemons = pokemonData.length;

  // Find the Pokémon with the given ID
  const currentPokemon = pokemonData.find(
    (pokemon) => pokemon.id === pokemonId
  );

  if (!currentPokemon) {
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
  const nextPokemon = pokemonData.find((pokemon) => pokemon.id === nextId);

  // Return the current Pokémon, and the previous and next Pokémon
  res.json({
    previousPokemon: previousPokemon || null, // Return null if no previous Pokémon
    currentPokemon: currentPokemon, // The main Pokémon
    nextPokemon: nextPokemon || null, // Return null if no next Pokémon
  });
}
module.exports = searchByIdController;
