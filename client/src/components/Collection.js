import React from "react";

function Collection(props) {
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
