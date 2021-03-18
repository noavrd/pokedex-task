const { Router } = require("express");
const pokemon = require("./pokemon");
const type = require("./type");
const collection = require("./collection");
const express = require("express");
const api = Router();

api.use(express.json());
api.use("/pokemon", pokemon);
api.use("/type", type);
api.use("/collection", collection);

module.exports = api;
