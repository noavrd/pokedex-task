import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api/collection";

function Collection(props) {
  const { seIndexCollection } = props;
  const { indexCollection } = props;
  const { collection } = props;
  const { reverseIndex } = props;
  const { forwordIndex } = props;
  return (
    <div>
      <button onClick={() => reverseIndex()}>◀️</button>
      <img
        className="pokemonCard-image"
        onClick={props.clickHandler}
        src={collection[indexCollection] ? collection[indexCollection].url : ""}
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
        alt={
          collection[indexCollection]
            ? `${collection[indexCollection].name}`
            : ""
        }
      ></img>
      <button onClick={() => forwordIndex()}>▶️</button>
    </div>
  );
}

export default Collection;
