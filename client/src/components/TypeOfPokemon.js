import React from "react";

function TypeOfPokemon(props) {
  return (
    <span className="pokemonType" onClick={props.clickHandler}>
      {" "}
      {props.pokemonType}{" "}
    </span>
  );
}

export default TypeOfPokemon;
