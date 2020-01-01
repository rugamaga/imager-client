import React from "react";

const RadioInput = ({group, name, checked, onChange}) =>
  <span>
    <input type="radio" name={group} value={name} checked={checked} onChange={onChange} />
    <label>{name}</label>
  </span>

export const RadioList = ({group, names, active, onChange}) =>
  <div>
    {
      names
        .map( (name) =>
          <RadioInput
            key={`${group}_${name}`}
            group={group}
            name={name}
            checked={name == active}
            onChange={onChange}
          />
        )
    }
  </div>
