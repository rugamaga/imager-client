import {h} from "hyperapp";
import {event} from "hyperapp-fx";

import spinner from './assets/spinner.svg';

export const NextLoader = ({image_loading}) => {
  if( image_loading ) {
    return (
      <div class="imagebox">
        <img src={spinner} />
      </div>
    );
  } else {
    return (
      <a onclick={event("handleNextLink")}><div class="imagebox loader"><span>next</span></div></a>
    );
  }
};
