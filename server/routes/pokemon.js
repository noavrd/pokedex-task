const { Router, response } = require("express");
const { default: axios } = require("axios");

const pokemon = Router();

pokemon.get("/:name", (req, res) => {
  const pokemonName = req.params.name;
  try {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        const typesOfPockemon = [];
        response.data.types.some(obj => {
          typesOfPockemon.push(obj.type.name);
        });
        const pokemoneObj = {
          name: response.data.name,
          height: response.data.height,
          weight: response.data.weight,
          type: typesOfPockemon,
        };
        res.send(pokemoneObj);
      })
      .catch(e => {
        res.status(404).send("No such pokemone");
      });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = pokemon;
