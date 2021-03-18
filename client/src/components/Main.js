import React, { useState, useEffect, useRef } from "react";
import Details from "./Details.js";
import Types from "./Types.js";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

function Main(props) {
  const [inputValue, setInputValue] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [click, setClick] = useState(false);
  const [typeListValue, setTypeListValue] = useState("hidden");
  const catchOrRealseButton = useRef("hidden");

  const shouldUpdate = useRef("");

  function clickHandler(e) {
    console.log(e.target.classList[0]);
    if (e.target.classList[0] === "searchPokemon") {
      shouldUpdate.current = "searchPokemon";
      catchOrRealseButton.current = "unhidden";
      setTypeListValue("");
      setClick(true);
    }
    if (e.target.classList[0] === "pokemonType") {
      setTypeListValue(e.target.innerText);
      shouldUpdate.current = "pokemonType";
    }
  }

  useEffect(() => {
    console.log("RANDERRRRRRRRRRRRRRRR");
    // if (shouldUpdate.current === "searchPokemon") {
    axios
      .get(`${BASE_URL}/pokemon/${inputValue}`)
      .then(response => {
        console.log(`${BASE_URL}/pokemon/${inputValue}`);
        console.log(response);
        setPokemonDetails(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    shouldUpdate.current = "";
    setClick(false);
    // }
    if (shouldUpdate.current === "pokemonType") {
      axios
        .get(`${BASE_URL}/type/${inputValue}`)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
      shouldUpdate.current = "";
    }
  }, []);

  return (
    <div>
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      ></input>
      <button className="searchPokemon" onClick={clickHandler}>
        Submit
      </button>
      <Details
        catchOrRealseButton={catchOrRealseButton.current}
        pokemon={pokemonDetails}
      />
      <Types setPokemonDetails={setPokemonDetails} />
    </div>
  );
}

export default Main;
