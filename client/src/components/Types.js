import React, { Component } from "react";

function Types(props) {
  if (props.ifDefined) {
    return (
      <div>
        <ul className="typesList">Types</ul>
        {console.log("TYPES PROPS", props)}
        {props.typeListValue ? (
          props.typeListValue.map((type) => <li onClick={props.clickHandler}>{type}</li>)
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
