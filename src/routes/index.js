const searchByTypeController = require("../controllers/searchByTypeController");
const searchByNameController = require("../controllers/searchByNameController");
const searchByIdController = require("../controllers/searchByIdController");
const pokemons = require("../controllers/getPokemons");
const postNewPokemon = require("../controllers/postNewPokemonController");

const express = require("express");
const app = express();

function routes(app) {
  app.get("/api/pokemons", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    pokemons(req, res);
  });

  app.get("/api/pokemons/type", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    searchByTypeController(req, res);
  });

  app.get("/api/pokemons/name", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    searchByNameController(req, res);
  });

  app.get("/api/pokemons/:id", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    searchByIdController(req, res);
  });

  app.use(express.json());
  app.post("/api/pokemons", (req, res) => {
    postNewPokemon(req, res);
  });
}

module.exports = routes;
