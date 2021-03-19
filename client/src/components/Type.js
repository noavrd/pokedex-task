import React, { useState } from "react";

function Type(props) {

  return (
    <span className="pokemonType" onClick={props.clickHandler}>
      {" "}
      {props.pokemonType}{" "}
    </span>
  );
}

export default Type;
