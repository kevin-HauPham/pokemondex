const { pokemonData } = require("../../data/db/data");

function pokemons(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);

  const allPokemons = Array.isArray(pokemonData)
    ? pokemonData
    : Object.values(pokemonData);

  if (!limit) {
    return res.json({
      totalPokemons: allPokemons.length,
      data: allPokemons,
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedPokemons = allPokemons.slice(startIndex, endIndex);

  res.json({
    totalPokemons: allPokemons.length,
    totalPages: Math.ceil(allPokemons.length / limit),
    currentPage: page,
    data: paginatedPokemons,
  });
}

module.exports = pokemons;
