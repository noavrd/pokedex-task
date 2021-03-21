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
  await data.forEach(async (element) => {
    let response2 = await axios.get(element.pokemon.url);
    urlImges.push({
      name: response2.data.name,
      urlImg: response2.data.sprites.front_default,
    });
  });
  console.log("URLLL", urlImges);
  setTimeout(() => {
    console.log(urlImges);
  }, 2000);
  res.send("hello");
});

module.exports = type;
