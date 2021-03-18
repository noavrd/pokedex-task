const { Router } = require("express");
const collection = Router();
const fs = require("fs");

const pokemonArr = [];

collection.post("/catch", (req, res) => {
  const newPokemon = req.body;
  const indexOfPokemon = pokemonArr.findIndex(
    obj => obj.name === newPokemon.name
  );
  if (indexOfPokemon === -1) {
    pokemonArr.push(newPokemon);
    res.send(pokemonArr);
  } else {
    res.status(400).json("Already exist");
  }
});

collection.get("/", (req, res) => {
  res.status(200).json(pokemonArr);
});
collection.delete("/release/:id", (req, res) => {
  const deleteIndex = pokemonArr.findIndex(obj => obj.name === req.params.id);
  pokemonArr.splice(deleteIndex, 1);
  res.status(200).json(pokemonArr);
});

module.exports = collection;
