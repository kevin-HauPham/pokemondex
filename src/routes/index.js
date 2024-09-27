const searchByTypeController = require("../controllers/searchByTypeController");
const searchByNameController = require("../controllers/searchByNameController");
const searchByIdController = require("../controllers/searchByIdController");
const pokemons = require("../controllers/getPokemons");
const postNewPokemon = require("../controllers/postNewPokemonController");

const express = require("express");
const app = express();

function routes(app) {
  // get all pokemons
  app.get("/api/pokemons", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    pokemons(req, res);
  });
  //option  query pokemons by type
  app.get("/api/pokemons/type", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    searchByTypeController(req, res);
  });
  // optin to query pokemons by name
  app.get("/api/pokemons/name", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    searchByNameController(req, res);
  });
  // option to query pokemons by id
  app.get("/api/pokemons/:id", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    searchByIdController(req, res);
  });
  // to post new pokemon to "/api/pokemons"
  app.use(express.json());
  app.post("/api/pokemons", (req, res) => {
    postNewPokemon(req, res);
  });
}

module.exports = routes;
