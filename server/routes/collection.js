const { Router } = require("express");
const collection = Router();
const fs = require("fs");

const collectionArr = [];

collection.post("/catch", (req, res) => {
  const newPokemon = req.body;
  const indexOfPokemon = collectionArr.findIndex(
    (obj) => obj.name === newPokemon.name
  );
  console.log(indexOfPokemon);
  if (indexOfPokemon === -1) {
    collectionArr.push(newPokemon);
    res.send(collectionArr);
  } else {
    res.status(400).json("Already exist");
  }
});

collection.get("/", (req, res) => {
  res.status(200).json(collectionArr);
});

collection.delete("/release/:id", (req, res) => {
  const deleteIndex = collectionArr.findIndex(
    (obj) => obj.name === req.params.id
  );
  collectionArr.splice(deleteIndex, 1);
  res.status(200).json(collectionArr);
});

module.exports = collection;
