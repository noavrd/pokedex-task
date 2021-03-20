import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api/collection";

function Collection(props) {
  const [indexCollection, seIndexCollection] = useState(0);
  const { collection } = props;

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
        src={
          collection[indexCollection]
            ? collection[indexCollection].url.front
            : ""
        }
        onMouseOver={(e) =>
          (e.currentTarget.src = collection[indexCollection].url.front
            ? collection[indexCollection].url.back
            : undefined)
        }
        onMouseOut={(e) =>
          (e.currentTarget.src = collection[indexCollection].url.back
            ? collection[indexCollection].url.front
            : undefined)
        }
        alt={`${
          collection[indexCollection]
            ? `${collection[indexCollection].name}`
            : ""
        }`}
      ></img>
      <button onClick={() => forwordIndex()}>▶️</button>
    </div>
  );
}

export default Collection;
