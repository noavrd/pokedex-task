import React, { Component } from "react";
import Type from "./Type.js";

function Details(props) {
  return (
    <div className="details-div">
      <ul>
        <li className="name">Name:{props.pokemon.name}</li>
        <li className="height">Height:{props.pokemon.height}</li>
        <li className="weight">Weight:{props.pokemon.weight}</li>
        <li className="types">
          Types:
          {console.log(props.pokemon.types)}
          {/* {props.pokemon.types.map(obj => (
            <Type pokemonType={obj} />
          ))} */}
        </li>
      </ul>
      <img className="details-img" src={props.pokemon.url} alt="pokemon"></img>
      <button className={props.catchOrRealseButton}>Catch</button>
    </div>
  );
}

export default Details;
