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
  const [catchOrRelease, setCatchOrRelease] = useState("Catch");
  const [typesHidden, setTypesHidden] = useState("hidden");

  const ifCatchOrReleaseClicked = useRef(false);
  const whoToUpdate = useRef("");
  const ifDefined = useRef(false);
  const [catchOrRemove, setCatchOrRemove] = useState("Catch");
  const [addOrRemove, setAddOrRemove] = useState({
    mode: "",
    pokemon: {},
  });

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
        setCatchOrRelease("Release");
      } else {
        setCatchOrRelease("Catch");
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

    if (e.target.className === "catchOrReleaseButton") {
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
      if (e.target.className === "catchOrReleaseButton") {
        ifCatchOrReleaseClicked.current = true;
        if (e.target.innerText === "Catch") {
          e.target.innerText = "Release";
          setCatchOrRelease("Release");
        } else {
          e.target.innerText = "Catch";
          setCatchOrRelease("Catch");
        }
      }
      if (e.target.className === "pokemonCard-image") {
        console.log("+++++++++", e.target.alt);
        setPokemonFromClick(e.target.alt);
        setInputValue(e.target.alt);
      }
      // setPokemonFromClick(e.target.innerText);
    }
    if (e.target.className === "pokemonCard-image") {
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
        ifCatchOrReleaseClicked.current = false;
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
            setCollection([...response.data]);
          })
          .catch((error) => console.log(error));
      }
      if (whoToUpdate.current === "pokemonType") {
        axios
          .delete(`http://localhost:3001/api/collection/release/${inputValue}`)
          .then((response) => {
            setCollection([...response.data]);
            seIndexCollection((prev) => prev - 1);
          })
          .catch((error) => console.log(error));
      }
      ifCatchOrRealseClicked.current = false;
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
        addOrRemove={addOrRemove}
      />
      <Types
        visibility={typesHidden}
        typeListValue={typeListValue}
        ifDefined={ifDefined.current}
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
    </div>
  );
}

export default Main;
