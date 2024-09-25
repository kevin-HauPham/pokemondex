const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "../../data/db/pekemonData.json");
let pokemonData;

try {
  const data = fs.readFileSync(dbFilePath, "utf-8"); // Synchronous read
  pokemonData = JSON.parse(data).data; // Extract the Pokémon array
  console.log("Pokemon data loaded successfully");
} catch (err) {
  console.error("Error reading or parsing pokemonData.json:", err);
  process.exit(1); // Exit if there's an error
}

module.exports = { pokemonData };
