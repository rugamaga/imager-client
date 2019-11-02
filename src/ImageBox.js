import {h} from "hyperapp";

import { TagBox } from './TagBox.js';

export const ImageBox = ({src, link, tags}) => (
  <div class="imagebox">
    <a href={link}><img src={src} /></a>
    <TagBox tags={tags} />
  </div>
);
