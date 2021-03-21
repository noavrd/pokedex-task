import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api/collection";

function Collection(props) {
  const [indexCollection, seIndexCollection] = useState(0);
  const { collection } = props;
  const mode = props.addOrRemove.mode;
  console.log(props.addOrRemove);
  const pokemon = props.addOrRemove.pokemon;
  console.log(props);
  useEffect(() => {
    console.log("pokemon", pokemon);
    if (mode === "Catch") {
      axios
        .post(`http://localhost:3001/api/collection/catch`, pokemon)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
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

  return (
    <div>
      {console.log("COLLECTION ", collection)}
      <button onClick={() => reverseIndex()}>◀️</button>
      <img
        className="pokemonCard-image"
        onClick={props.clickHandler}
{console.log(collection[indexCollection])}
        src={
          collection[indexCollection]
            ? collection[indexCollection].url
            : ""
        }
        onMouseOver={(e) =>
          (e.currentTarget.src = collection[indexCollection].url
            ? collection[indexCollection].url.back
            : undefined)
        }
        onMouseOut={(e) =>
          (e.currentTarget.src = collection[indexCollection].url.back
            ? collection[indexCollection].url.front
            : undefined)
        }
        alt={`${collection[indexCollection].name}`}
      ></img>
      <button onClick={() => forwordIndex()}>▶️</button>
    </div>
  );
}

export default Collection;
