import React from "react";
import PokemonInType from "./PokemonInType";

function Types(props) {
  if (props.ifDefined) {
    return (
      <div>
        <ul className="typesList" style={{ visibility: `${props.visibility}` }}>
          Types
        </ul>
        {props.typeListValue ? (
          props.typeListValue.map((objType, index) => (
            <li onClick={props.clickHandler} key={index} className="typeList">
<<<<<<< HEAD
              <TypeInTypes pokemonName={objType.name} />
=======
              {/* <PokemonInType pokemonName={objType.name} /> */}
              {objType.name}
>>>>>>> 39ef817ddb02c95b4b1212da6513980617088148
            </li>
          ))
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}
export default Types;
