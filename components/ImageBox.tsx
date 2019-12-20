import React from "react";

import { TagBox } from './TagBox';

export const ImageBox = ({src, link, tags, onSelectTag}) =>
  <div className="imagebox">
    <a href={link}><img src={src} /></a>
    <TagBox tags={tags} onSelectTag={onSelectTag} />
  </div>
