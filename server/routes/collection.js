const { Router } = require("express");
const collection = Router();
const fs = require("fs");

collection.get("/", (req, res) => {
  res.send("collection route");
});

collection.post("/api/collection/catch", (req, res) => {
  try {
    const newPokemon = req.body;
    const currentCollection = JSON.parse(
      fs.readFileSync("./localCollection/localCollections.json")
    );
    if (!currentCollection.some(pokemon => pokemon.name === newPokemon)) {
      currentCollection.push(newPokemone);
      fs.writeFileSync(
        "./localCollection/localCollections.json",
        JSON.stringify(currentCollection)
      );
      res.status(200).json(currentCollection);
    } else {
      res.status(200).send("pokemon already exist");
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

collection.get("/api/collection", (req, res) => {
  try {
    const collection = JSON.parse(
      fs.readFileSync("./localCollection/localCollections.json")
    );
    if (collection.length === 0) {
      return res.status(200).send("collection empty");
    }
    return res.status(200).json(collection);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

collection.delete("/api/collection/release/:id", (req, res) => {
  try {
    const deleteIndex = req.params.id;
    const currentCollection = JSON.parse(
      fs.readFileSync("./localCollection/localCollections.json")
    );
    currentCollection.splice(i, 1);
    fs.writeFileSync(
      "./localCollection/localCollections.json",
      JSON.stringify(currentCollection)
    );
    res.status(200).json(currentCollection);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = collection;
