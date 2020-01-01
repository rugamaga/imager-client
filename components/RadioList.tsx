import React from "react";

const RadioInput = ({group, name, id, checked, onChange}) =>
  <span key={id}>
    <input type="radio" id={id} name={group} value={name} checked={checked} onChange={onChange} />
    <label id={id}>{name}</label>
  </span>

export const RadioList = ({group, names, active, onChange}) =>
  <div>
    {
      names
        .map( (name) =>
          <RadioInput
            group={group}
            name={name}
            id={`${group}_${name}`}
            checked={name == active}
            onChange={onChange}
          />
        )
    }
  </div>
