import {h} from "hyperapp";
import {event} from "hyperapp-fx";

export const TagBox = ({tags}) => (
  <div class="tags">
    <ul>
      { tags.map( (tag) => (<li><a name={tag.name} onclick={event("handleTagLink")}>{tag.name}</a></li>) ) }
    </ul>
  </div>
);
