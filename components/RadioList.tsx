import React from "react";

export const RadioList = ({group, names, active, onClick}) =>
  <div>
    {
      names.map( (name) => {
        const id = `${group}_${name}`;
        return (
          <span>
            <input type="radio" name={group} id={id} value={name} onClick={onClick} checked={name==active} />
            <label id={id}>{name}</label>
          </span>
        );
      } )
    }
  </div>
