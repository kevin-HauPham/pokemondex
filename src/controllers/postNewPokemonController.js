const { pokemonData } = require("../../data/db/data");

const validPokemonTypes = [
  "bug",
  "dragon",
  "fairy",
  "fire",
  "ghost",
  "ground",
  "normal",
  "psychic",
  "steel",
  "dark",
  "electric",
  "fighting",
  "flying",
  "grass",
  "ice",
  "poison",
  "rock",
  "water",
];

function postNewPokemonController(req, res) {
  const { id, name, types, url } = req.body;

  // Error: Missing required data
  // if (!id || !name || !types || !url) {
  //   return res.status(400).json({ error: "Missing required data." });
  // }

  // Error: Pokémon can only have one or two types
  if (types.length > 2) {
    return res
      .status(400)
      .json({ error: "Pokémon can only have one or two types." });
  }

  //Error: Pokémon's type is invalid
  const invalidTypes = types.filter(
    (type) => !validPokemonTypes.includes(type)
  );
  if (invalidTypes.length > 0) {
    return res
      .status(400)
      .json({ error: "Pokémon's type is invalid.", invalidTypes });
  }

  // Error: The Pokémon already exists
  const existingPokemon = pokemonData.find(
    (pokemon) =>
      pokemon.id === id || pokemon.name.toLowerCase() === name.toLowerCase()
  );
  if (existingPokemon) {
    return res.status(400).json({ error: "The Pokémon already exists." });
  }

  // Create a new Pokémon object
  const newPokemon = { id, name, types, url };

  // Add the new Pokémon to the data array and respond
  pokemonData.push(newPokemon);
  req.app.locals.pokemonData = pokemonData; // Update app.locals

  res.status(201).json({
    message: "Pokémon created successfully.",
    pokemon: newPokemon,
  });
}

module.exports = postNewPokemonController;
