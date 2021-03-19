import React, { Component, useDebugValue, useEffect } from "react";
import axios from "axios";
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
              {objType.name}
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
