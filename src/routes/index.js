const searchByTypeController = require("../controllers/searchByTypeController");
const searchByNameController = require("../controllers/searchByNameController");
const searchByIdController = require("../controllers/searchByIdController");
const pokemons = require("../controllers/pokemons");
const postNewPokemon = require("../controllers/postNewPokemonController");

function routes(app) {
  app.get("/api/pokemons", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    pokemons(req, res);
  });

  app.get("/api/pokemons/type", (req, res) => {
    searchByTypeController(req, res);
  });

  app.get("/api/pokemons/name", (req, res) => {
    searchByNameController(req, res);
  });

  app.get("/api/pokemons/:id", (req, res) => {
    searchByIdController(req, res);
  });

  app.post("/api/pokemons", (req, res) => {
    postNewPokemon(req.res);
  });
}

module.exports = routes;
