const { Router } = require("express");
const { default: axios } = require("axios");

const type = Router();

type.get("/", (req, res) => {
  res.send("type route");
});
type.get("/:name", (req, res) => {
  const name = req.params.name;
  try {
    axios
      .get(`https://pokeapi.co/api/v2/type/${name}`)
      .then(response => {
        const pokemoneTypes = [];
        response.data.pokemon.forEach(obj => {
          pokemoneTypes.push({ name: obj.pokemon.name, url: obj.pokemon.url });
        });
        res.json({
          name: name,
          id: response.data.id,
          pokemons: pokemoneTypes,
        });
      })
      .catch(() => {
        res.status(404).send("Type not found");
      });
  } catch (e) {
    res.statue(500).send(e);
  }
});

module.exports = type;
