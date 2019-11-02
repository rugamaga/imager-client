import {h} from "hyperapp";

export const RadioList = ({group, names, active, onclick}) => (
  <div>
    {
      names.map( (name) => {
        const id = `${group}_${name}`;
        return (
          <span>
            <input type="radio" name={group} id={id} value={name} onclick={onclick} checked={name==active} />
            <label for={id}>{name}</label>
          </span>
        );
      } )
    }
  </div>
);
