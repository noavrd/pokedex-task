import React, { useState, useEffect, useRef } from "react";
import Details from "./Details.js";
import Types from "./Types.js";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

function Main(props) {
  const [inputValue, setInputValue] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonFromClick, setPokemonFromClick] = useState("");
  const [typeListValue, setTypeListValue] = useState([]);
  const [typesHidden, setTypesHidden] = useState("hidden");
  const catchOrRealseButton = useRef("hidden");

  const whoToUpdate = useRef("");
  const ifDefined = useRef(false);
  console.log("ITS ME", ifDefined.current);

  function clickHandler(e) {
    console.log("THE CLICK HANDLER", e.target.className);
    if (e.target.className === "searchPokemon") {
      whoToUpdate.current = "searchPokemon";
      setPokemonFromClick(inputValue);
    }
    if (e.target.className === "pokemonType") {
      whoToUpdate.current = "pokemonType";
      setPokemonFromClick(
        e.target.innerText.slice(1, e.target.innerText.length)
      );
    }
    if (e.target.className === "typeList") {
      whoToUpdate.current = "searchPokemon";
      setPokemonFromClick(e.target.innerText);
    }
  }

  useEffect(() => {
    console.log("RANDERRRRRRRRRRRRRRRR");
    if (whoToUpdate.current === "searchPokemon") {
      axios
        .get(`${BASE_URL}/pokemon/${pokemonFromClick}`)
        .then((response) => {
          console.log(`${BASE_URL}/pokemon/${pokemonFromClick}`);
          ifDefined.current = true;
          setPokemonDetails(response.data);
          console.log(pokemonDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (whoToUpdate.current === "pokemonType") {
      console.log("PASS TYPE");
      axios
        .get(`${BASE_URL}/type/${pokemonFromClick}`)
        .then((response) => {
          let tempArr = [...response.data.pokemons];
          let namesOfTempArr = [];
          setTypeListValue(tempArr);
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
        clickHandler={clickHandler}
      />
      <Types
        visibility={typesHidden}
        typeListValue={typeListValue}
        ifDefined={ifDefined.current}
        clickHandler={clickHandler}
      />
    </div>
  );
}

export default Main;
