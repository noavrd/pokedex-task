const { Router, response } = require("express");
const { default: axios } = require("axios");

const pokemon = Router();

pokemon.get("/:name", (req, res) => {
  const pokemonName = req.params.name;
  try {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        console.log(response.data.name);
        res.send(response.data.name);
      });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = pokemon;
