const { Router } = require("express");
const { default: axios } = require("axios");
const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

const type = Router();

type.get("/", (req, res) => {
  res.send("type route");
});

type.get("/:name", (req, res) => {
  const name = req.params.name;
  try {
    const data = axios.get(`${POKEAPI_BASE_URL}/type/${name}`);
    if (data.staus === 404) {
      return res.status(404).send("Type not found");
    }
    res.send(data);
  } catch (e) {
    res.json({ message: e });
  }
  axios
    .get(POKEAPI_BASE_URL)
    .then()
    .catch(error => {});
});

module.exports = type;
