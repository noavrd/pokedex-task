import React, { useState, useEffect, useRef } from "react";
import Details from "./Details.js";
import Types from "./Types.js";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

function Main(props) {
  const [inputValue, setInputValue] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonFromClick, setPokemonFromClick] = useState("");
  const [typeListValue, setTypeListValue] = useState("hidden");
  const catchOrRealseButton = useRef("hidden");

  const whoToUpdate = useRef("");
  const ifDefined = useRef(false);
  console.log("ITS ME", ifDefined.current);

  function clickHandler() {
    setPokemonFromClick(inputValue);
    ifDefined.current = true;
    console.log(ifDefined.current);
  }

  useEffect(() => {
    console.log("RANDERRRRRRRRRRRRRRRR");
    // if (shouldUpdate.current === "searchPokemon") {
    axios
      .get(`${BASE_URL}/pokemon/${pokemonFromClick}`)
      .then((response) => {
        console.log(`${BASE_URL}/pokemon/${pokemonFromClick}`);
        setPokemonDetails(response.data);
        console.log(pokemonDetails);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
    if (whoToUpdate.current === "pokemonType") {
      axios
        .get(`${BASE_URL}/type/${inputValue}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pokemonFromClick]);

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button type="button" className="searchPokemon" onClick={clickHandler}>
        Submit
      </button>
      <Details
        catchOrRealseButton={catchOrRealseButton.current}
        pokemon={pokemonDetails}
        ifDefined={ifDefined.current}
      />
      <Types
        setPokemonDetails={setPokemonDetails}
        ifDefined={ifDefined.current}
      />
    </div>
  );
}

export default Main;
