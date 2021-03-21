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
        {props.typeListValue ? (
          props.typeListValue.map((objType, index) => (
            <li onClick={props.clickHandler} key={index} className="typeList">
              {/* {objType.name} */}
              <TypeInTypes pokemonName={objType.name} />

              {/* {objType.name} */}
              <TypeInTypes pokemonName={objType.name} />


              {/* {objType.name} */}
              <TypeInTypes pokemonName={objType.name} />

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
