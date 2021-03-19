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
  const [catchOrRelease, setCatchOrRealease] = useState("catch");
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
      // let ifExist = false;
      // axios.get(`${BASE_URL}/collection`).then((response) => {
      //   let tempArr = [...response.data];
      //   tempArr.forEach((pokemon) => {
      //     console.log("POKEMON COLLECTION NAME", pokemon.name);
      //     console.log("inputValue", inputValue);
      //     if (pokemon.name === inputValue) {
      //       ifExist = true;
      //       console.log("IFEXIST", ifExist);
      //     }
      //   });
      // });
      if (catchOrRelease === "Catch") {
        setCatchOrRealease("Release");
        setAddOrRemove({ mode: "Catch", pokemon: pokemonDetails });
      } else {
        setCatchOrRealease("Catch");
        setAddOrRemove({ mode: "Release", pokemon: pokemonDetails });
      }
      console.log("catchOrRelease", catchOrRelease);
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
      setInputValue(e.target.innerText);
      setPokemonFromClick(e.target.innerText);
    }

    if (e.target.className === "catchOrRealseButton") {
      console.log("catch clicked!");
      if (e.target.innerText === "Catch") {
        e.target.innerText = "Release";
        setAddOrRemove({ mode: "Catch", pokemon: pokemonDetails });
      } else {
        e.target.innerText = "Catch";
        setAddOrRemove({ mode: "Release", pokemon: pokemonDetails });
      }
      // setPokemonFromClick(e.target.innerText);
    }
  }

  useEffect(() => {
    console.log("MAIN RANDERRRRRRRRRRRRRRRR");
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
    axios.get(`${BASE_URL}/collection`).then((response) => {
      let bool = false;
      let tempArr = [...response.data];
      tempArr.forEach((pokemon) => {
        if (pokemon.name === inputValue) {
          bool = true;
        }
      });
      if (bool) {
        setCatchOrRealease("Release");
      } else {
        setCatchOrRealease("Catch");
      }
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
      {console.log(
        "catchOrReleasecatchOrReleasecatchOrRelease",
        catchOrRelease
      )}
      <Details
        pokemon={pokemonDetails}
        ifDefined={ifDefined.current}
        catchOrRelease={catchOrRelease}
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
