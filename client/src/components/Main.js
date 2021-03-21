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
  const [catchOrRelease, setCatchOrRelease] = useState("catch");
  const [typesHidden, setTypesHidden] = useState("hidden");
<<<<<<< HEAD
<<<<<<< HEAD
  const [addOrRemove, setAddOrRemove] = useState({
    mode: "",
    pokemon: {},
  });
  const ifCatchOrReleaseClicked = useRef(false);
=======

  const ifCatchOrRealseClicked = useRef(false);
>>>>>>> parent of 39ef817 (fixed code)
=======

  const ifCatchOrRealseClicked = useRef(false);
>>>>>>> parent of 39ef817 (fixed code)
  const whoToUpdate = useRef("");
  const ifDefined = useRef(false);
  const [catchOrRemove, setCatchOrRemove] = useState("Catch");

  function clickHandler(e) {
    console.log(e.target);
    if (e.target.className === "searchPokemon") {
      if (catchOrRelease === "Catch") {
        setCatchOrRelease("Release");
        setAddOrRemove({ mode: "Catch", pokemon: pokemonDetails });
      } else {
        setCatchOrRelease("Catch");
        setAddOrRemove({ mode: "Release", pokemon: pokemonDetails });
      }
      console.log("catchOrRelease", catchOrRelease);
      whoToUpdate.current = "searchPokemon";
      setPokemonFromClick(inputValue);
    }
    //click on the type
    if (e.target.className === "pokemonType") {
      whoToUpdate.current = "pokemonType";
      setPokemonFromClick(
        e.target.innerText.slice(1, e.target.innerText.length)
      );
    }
    //change the pokemon when clicking on it
    if (e.target.className === "typeList") {
      whoToUpdate.current = "searchPokemon";
      setInputValue(e.target.innerText);
      setPokemonFromClick(e.target.innerText);
    }

<<<<<<< HEAD
<<<<<<< HEAD
    if (e.target.className === "catchOrReleaseButton") {
=======
    if (e.target.className === "catchOrRealseButton") {
>>>>>>> parent of 39ef817 (fixed code)
=======
    if (e.target.className === "catchOrRealseButton") {
>>>>>>> parent of 39ef817 (fixed code)
      ifCatchOrReleaseClicked.current = true;
      if (e.target.innerText === "Catch") {
        e.target.innerText = "Release";
        setCatchOrRelease("Release");
        setAddOrRemove({ mode: "Catch", pokemon: pokemonDetails });
      } else {
        e.target.innerText = "Catch";
        setCatchOrRelease("Catch");
        setAddOrRemove({ mode: "Release", pokemon: pokemonDetails });
      }
      // setPokemonFromClick(e.target.innerText);
    }
    if (e.target.className === "pokemonCard-image") {
      console.log("+++++++++", e.target.alt);
      setPokemonFromClick(e.target.alt);
      setInputValue(e.target.alt);
    }
  }

  useEffect(() => {
    if (ifCatchOrReleaseClicked.current) {
      if (catchOrRelease === "Release") {
        axios
          .post(`http://localhost:3001/api/collection/catch`, pokemonDetails)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
        axios
          .get(`${BASE_URL}/collection`)
          .then((response) => setCollection([...response.data]))
          .catch((error) => console.log(error));
      }
      if (catchOrRelease === "Catch") {
        axios
          .delete(
            `http://localhost:3001/api/collection/release/${pokemonDetails.name}`
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
        axios
          .get(`${BASE_URL}/collection`)
          .then((response) => setCollection([...response.data]))
          .catch((error) => console.log(error));
      }
      ifCatchOrRealseClicked.current = false;
    }
  }, [catchOrRelease]);

  useEffect(() => {
    axios.get(`${BASE_URL}/collection`).then((response) => {
      setCollection([...response.data]);
      let bool = false;
      let tempArr = [...response.data];
      tempArr.forEach((pokemon) => {
        if (pokemon.name === inputValue) {
          bool = true;
        }
      });
      if (bool) {
        setCatchOrRelease("Release");
      } else {
        setCatchOrRelease("Catch");
      }
    });
  }, [pokemonFromClick]);

  useEffect(() => {
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
  }, [pokemonFromClick]);

  return (
    <div>
      {console.log(
        " ifCatchOrReleaseClicked.current",
        ifCatchOrReleaseClicked.current
      )}
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
        catchOrRelease={catchOrRelease}
        clickHandler={clickHandler}
      />
      <Collection
        collection={collection}
        clickHandler={clickHandler}
        addOrRemove={addOrRemove}
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
