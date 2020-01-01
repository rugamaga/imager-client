import React from "react";

export const TagBox = ({tags, onSelectTag}) =>
  <div className="tags">
    <ul>
      { tags.map( tag => <li key={tag}><a onClick={onSelectTag}>{tag.name}</a></li>) }
    </ul>
  </div>
