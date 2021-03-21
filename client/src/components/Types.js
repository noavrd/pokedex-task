import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import TypeInTypes from "./TypeInTypes";

function Types(props) {
  if (props.ifDefined) {
    return (
      <div>
        <ul className="typesList" style={{ visibility: `${props.visibility}` }}>
          Types
        </ul>
        {console.log("TYPES PROPS", props)}
        {props.typeListValue ? (
          props.typeListValue.map((objType, index) => (
            <li onClick={props.clickHandler} key={index} className="typeList">
<<<<<<< HEAD
              {objType.name}
              {/* <TypeInTypes pokemonName={objType.name} /> */}
=======
              {/* {objType.name} */}
              <TypeInTypes pokemonName={objType.name} />
>>>>>>> parent of 39ef817 (fixed code)
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
