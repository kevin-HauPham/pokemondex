const { pokemonData } = require("../../data/db/data");

function getPokemons(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);
  const search = req.query.search ? req.query.search.toLowerCase() : null;
  const type = req.query.type ? req.query.type.toLowerCase() : null;

  // Retrieve all Pokémons
  const allPokemons = Array.isArray(pokemonData)
    ? pokemonData
    : Object.values(pokemonData);

  // Filter by search query (name)
  let filteredPokemons = allPokemons;
  if (search) {
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );
  }

  // Filter by Pokémon type
  if (type) {
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.types.some((pokemonType) => pokemonType.toLowerCase() === type)
    );
  }

  // If no limit is provided, return all filtered Pokémons
  if (!limit) {
    return res.json({
      totalPokemons: filteredPokemons.length,
      data: filteredPokemons,
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Paginate filtered results
  const paginatedPokemons = filteredPokemons.slice(startIndex, endIndex);

  res.json({
    totalPokemons: filteredPokemons.length,
    totalPages: Math.ceil(filteredPokemons.length / limit),
    currentPage: page,
    data: paginatedPokemons,
  });
}

module.exports = getPokemons;
