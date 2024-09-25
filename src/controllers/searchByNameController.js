// take out pokemonData from db folder
const { pokemonData } = require("../../data/db/data");
// API2: Search Pokémon by name

function searchByNameController(req, res) {
  const name = req.query.name?.toLowerCase();

  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required." });
  }

  // Find Pokémon by name
  const filteredPokemons = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(name)
  );

  res.json({
    total: filteredPokemons.length,
    data: filteredPokemons,
  });
}
module.exports = searchByNameController;
