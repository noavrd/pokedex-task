import React, { useEffect } from "react";
import Type from "./Type.js";

function Details(props) {
  useEffect(() => {
    console.log("RANDERED");
  }, []);

  return (
    <div className="details-div">
      <ul>
        <li className="name">Name:{props.pokemon.name}</li>
        <li className="height">Height:{props.pokemon.height}</li>
        <li className="weight">Weight:{props.pokemon.weight}</li>
        <li className="types">
          Types:
          {console.log(props)}
          {props.pokemon.type
            ? props.pokemon.type.map((type, i) => (
                <Type pokemonType={type} key={i} />
              ))
            : ""}
        </li>
      </ul>
      {console.log(props.pokemon.url)}
      <img
        className="details-img"
        src={props.pokemon.url.front}
        alt="pokemon"
      ></img>
      <button className={props.catchOrRealseButton}>Catch</button>
    </div>
  );
}

export default Details;
