const { Router } = require("express");
const { default: axios } = require("axios");

const type = Router();

type.get("/", (req, res) => {
  res.send("type route");
});
type.get("/:name", async (req, res) => {
  const name = req.params.name;
  const urlImges = [];
  const response1 = await axios.get(`https://pokeapi.co/api/v2/type/${name}`);
  const data = response1.data.pokemon;
  const id = response1.data.id;
  let index = 0;
  var bar = new Promise((resolve, reject) => {
    data.forEach(async (element) => {
      let response2 = await axios.get(element.pokemon.url);
      urlImges.push({
        name: response2.data.name,
        urlImg: response2.data.sprites.front_default,
      });
      index++;
      if (index === data.length - 1) {
        resolve();
      }
    });
  });
  bar.then(() => {
    console.log("All done!");
    console.log("URLLL", urlImges);
    res.status(200).json({ type: name, id: id, pokemonArray: urlImges });
  });
});

module.exports = type;
