const request = require("supertest");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postNewPokemonController = require("./controllers/postNewPokemonController");
const pokemonData = []; // Mock the pokemonData array

const app = express();

// Use CORS and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Define your route
app.post("/api/pokemons", postNewPokemonController);

// Define a simple in-memory data store for testing
app.locals.pokemonData = pokemonData;

describe("POST /api/pokemons", () => {
  it("should create a new Pokémon and return 201", async () => {
    const newPokemon = {
      id: 999,
      name: "Pikachu",
      types: ["electric"],
      url: "http://example.com/pikachu",
    };

    const response = await request(app)
      .post("/api/pokemons")
      .send(newPokemon)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Pokémon created successfully.");
    expect(response.body.pokemon).toMatchObject(newPokemon);
    expect(pokemonData).toContainEqual(newPokemon);
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/api/pokemons").send({}); // Sending an empty object

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Missing required data.");
  });

  it("should return 400 if Pokémon type is invalid", async () => {
    const invalidPokemon = {
      id: 1000,
      name: "Unknown",
      types: ["unknownType"], // Invalid type
      url: "http://example.com/unknown",
    };

    const response = await request(app)
      .post("/api/pokemons")
      .send(invalidPokemon);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Pokémon's type is invalid.");
  });

  it("should return 400 if Pokémon already exists", async () => {
    const existingPokemon = {
      id: 1001,
      name: "Bulbasaur",
      types: ["grass", "poison"],
      url: "http://example.com/bulbasaur",
    };

    // First, add the existing Pokémon
    pokemonData.push(existingPokemon);

    const response = await request(app)
      .post("/api/pokemons")
      .send(existingPokemon);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("The Pokémon already exists.");
  });
});
