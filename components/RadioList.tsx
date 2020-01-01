import React from "react";

const RadioInput = ({id, group, name, checked, onChange}) =>
  <span>
    <input type="radio" id={id} name={group} value={name} checked={checked} onChange={onChange} />
    <label htmlFor={id}>{name}</label>
  </span>

export const RadioList = ({group, names, active, onChange}) =>
  <div>
    {
      names
        .map( (name) => [name, `${group}_${name}`] )
        .map( ([name, id]) =>
          <RadioInput
            key={id}
            id={id}
            group={group}
            name={name}
            checked={name == active}
            onChange={onChange}
          />
        )
    }
  </div>
