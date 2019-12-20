import React from "react";

export const TagBox = ({tags, onSelectTag}) =>
  <div className="tags">
    <ul>
      { tags.map( tag => <li><a onClick={onSelectTag}>{tag.name}</a></li>) }
    </ul>
  </div>
