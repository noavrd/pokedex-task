import React from "react";

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
              {objType.name}
              <img
                className="type-img"
                src={objType.urlImg}
                alt="pokemon"
              ></img>
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
