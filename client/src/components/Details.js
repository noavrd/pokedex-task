import Type from "./Type.js";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

function Details(props) {
  return (
    <div className="pokemonCard">
      <ul className="pokemonCard-content">
        <li className="name">Name:{props.pokemon.name}</li>
        <li className="height">Height:{props.pokemon.height}</li>
        <li className="weight">Weight:{props.pokemon.weight}</li>
        <li className="types">
          Types:
          {props.pokemon.type
            ? props.pokemon.type.map((type, i) => (
                <Type
                  pokemonType={type}
                  key={i}
                  clickHandler={props.clickHandler}
                />
              ))
            : ""}
        </li>
      </ul>

      {props.ifDefined ? (
        <img
          className="pokemonCard-image"
          src={props.pokemon.url ? props.pokemon.url.front : undefined}
          onMouseOver={(e) =>
            (e.currentTarget.src = props.pokemon.url
              ? props.pokemon.url.back
              : undefined)
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = props.pokemon.url
              ? props.pokemon.url.front
              : undefined)
          }
          alt="pokemon"
        ></img>
      ) : (
        <></>
      )}
      {props.ifDefined ? (
        <button className="catchOrReleaseButton" onClick={props.clickHandler}>
          {props.catchOrRelease}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Details;
