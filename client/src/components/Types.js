import React, { Component } from "react";

function Types(props) {
  if (props.ifDefined) {
    return (
      <div>
        <ul className="typesList">Types</ul>
        <li></li>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Types;
