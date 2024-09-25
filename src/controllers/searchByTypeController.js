const { pokemonData } = require("../../data/db/data");

function searchByTypeController(req, res) {
  // Get //api/pokemons/type
  const type = req.query.type?.toLowerCase();

  if (!type) {
    return res.status(400).json({ error: "Type query parameter is required." });
  }

  // Filter Pokémon by type

  const filteredPokemons = pokemonData.filter((pokemon) =>
    pokemon.types.some((pokeType) => pokeType.toLowerCase() === type)
  );

  res.json({
    total: filteredPokemons.length,
    data: filteredPokemons,
  });
}

module.exports = searchByTypeController;
