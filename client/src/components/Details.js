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
          className="details-img"
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
      <button className={props.catchOrRealseButton}>Catch</button>
    </div>
  );
}

export default Details;
