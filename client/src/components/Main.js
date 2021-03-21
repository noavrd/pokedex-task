import React, { useState, useEffect, useRef } from "react";
import Details from "./Details.js";
import Types from "./Types.js";
import Collection from "./Collection";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

function Main(props) {
  const [indexCollection, seIndexCollection] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonFromClick, setPokemonFromClick] = useState("");
  const [typeListValue, setTypeListValue] = useState([]);
  const [collection, setCollection] = useState([]);
  const [catchOrRelease, setCatchOrRealease] = useState("catch");
  const [typesHidden, setTypesHidden] = useState("hidden");

  const ifCatchOrRealseClicked = useRef(false);
  const whoToUpdate = useRef("");
  const ifDefined = useRef(false);

  function reverseIndex() {
    if (indexCollection === 0) {
      seIndexCollection((prev) => (prev = collection.length - 1));
    } else {
      seIndexCollection((prev) => prev - 1);
    }
  }

  function forwordIndex() {
    if (indexCollection === collection.length - 1) {
      seIndexCollection((prev) => (prev = 0));
    } else {
      seIndexCollection((prev) => prev + 1);
    }
  }

  function clickHandler(e) {
    if (e.target.className === "searchPokemon") {
      if (catchOrRelease === "Catch") {
        setCatchOrRealease("Release");
      } else {
        setCatchOrRealease("Catch");
      }
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
      ifCatchOrRealseClicked.current = true;
      if (e.target.innerText === "Catch") {
        e.target.innerText = "Release";
        setCatchOrRealease("Release");
      } else {
        e.target.innerText = "Catch";
        setCatchOrRealease("Catch");
      }
      // setPokemonFromClick(e.target.innerText);
    }
    if (e.target.className === "pokemonCard-image") {
      setPokemonFromClick(e.target.alt);
      setInputValue(e.target.alt);
    }
  }

  useEffect(() => {
    if (ifCatchOrRealseClicked.current) {
      if (catchOrRelease === "Release") {
        axios
          .post(`http://localhost:3001/api/collection/catch`, pokemonDetails)
          .then((response) => {
            setCollection([...response.data]);
          })
          .catch((error) => console.log(error));
      }
      if (catchOrRelease === "Catch") {
        axios
          .delete(`http://localhost:3001/api/collection/release/${inputValue}`)
          .then((response) => {
            setCollection([...response.data]);
            seIndexCollection((prev) => prev - 1);
          })
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
        if (pokemon.name === pokemonFromClick) {
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
          console.log("response.data.pokemons", response.data);
          let tempArr = [...response.data.pokemonArray];
          setTypeListValue(tempArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pokemonFromClick]);

  return (
    <div>
      {console.log("INDEXXXXXX", indexCollection)}
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
        seIndexCollection={seIndexCollection}
        indexCollection={indexCollection}
        reverseIndex={reverseIndex}
        forwordIndex={forwordIndex}
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
