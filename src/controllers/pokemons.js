const { pokemonData } = require("../../data/db/data");

function pokemons(req, res) {
  res.json({
    total: pokemonData.length,
    data: pokemonData,
  });
}

module.exports = pokemons;
