import React, { useState, useEffect, useRef } from "react";
import Details from "./Details.js";
import Types from "./Types.js";
import Collection from "./Collection";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

function Main(props) {
  const [inputValue, setInputValue] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonFromClick, setPokemonFromClick] = useState("");
  const [typeListValue, setTypeListValue] = useState([]);
  const [collection, setCollection] = useState([]);
  const [addOrRemove, setAddOrRemove] = useState({
    mode: "",
    pokemon: {},
  });
  const [typesHidden, setTypesHidden] = useState("hidden");

  const [catchOrRemove, setCatchOrRemove] = useState("Catch");
  const whoToUpdate = useRef("");
  const ifDefined = useRef(false);

  function clickHandler(e) {
    console.log("THE CLICK HANDLER", e.target.className);
    if (e.target.className === "searchPokemon") {
      whoToUpdate.current = "searchPokemon";
      setPokemonFromClick(inputValue);
      setAddOrRemove({ mode: "", pokemon: {} });
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
    if (e.target.className === "catchOrRealseButton") {
      console.log("catch clicked!");
      if (e.target.innerText === "Catch") {
        e.target.innerText = "Release";
        setAddOrRemove({ mode: "Release", pokemon: pokemonDetails });
      } else {
        e.target.innerText = "Catch";
        setAddOrRemove({ mode: "Catch", pokemon: pokemonDetails });
      }
      // setPokemonFromClick(e.target.innerText);
    }
  }

  useEffect(() => {
    console.log("MAIN RANDERRRRRRRRRRRRRRRR");
    console.log("MA NISHMA PO", addOrRemove);
    if (whoToUpdate.current === "searchPokemon") {
      axios
        .get(`${BASE_URL}/pokemon/${pokemonFromClick}`)
        .then((response) => {
          ifDefined.current = true;
          setPokemonDetails(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (whoToUpdate.current === "pokemonType") {
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
    axios.get(`${BASE_URL}/collection`).then((respone) => {
      console.log("COLECTION GET", respone);
    });
  }, [pokemonFromClick]);

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button type="button" className="searchPokemon" onClick={clickHandler}>
        Search
      </button>
      <Details
        pokemon={pokemonDetails}
        ifDefined={ifDefined.current}
        catchOrRemove={catchOrRemove}
        clickHandler={clickHandler}
      />
      <Types
        visibility={typesHidden}
        typeListValue={typeListValue}
        ifDefined={ifDefined.current}
        clickHandler={clickHandler}
      />
      <Collection addOrRemove={addOrRemove} />
    </div>
  );
}

export default Main;
