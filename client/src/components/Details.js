import Type from "./Type.js";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

function Details(props) {
  // const [typeClicked, setTypeClick] = useEffect(false);
  // const clickedValue = useRef("");

  // function clickHandler(e) {
  //   if ((e.target.className = "pokemonType")) {
  //     setTypeClick(true);
  //     clickedValue.current = e.target.innerText;
  //   }
  // }

  // useEffect(() => {
  //   if (typeClicked) {
  //     console.log("TYPES FETCH");
  //     axios
  //       .get(`${BASE_URL}/type/${clickedValue.current}`)
  //       .then((response) => {
  //         console.log("FETCH", response);
  //         setTypeListValue(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   console.log("TYPES RENDER");
  // });

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
                <Type pokemonType={type} key={i} clickHandler={props.clickHandler} />
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
