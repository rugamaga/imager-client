import {h} from "hyperapp";

export const SearchBox = ({value, oninput}) => (
  <form novalidate="novalidate" onsubmit="return false;" class="searchbox sbx">
    <div role="search" class="sbx__wrapper">
      <input type="search" name="search" value={value} oninput={oninput} placeholder="tag search" autocomplete="off" required="required" class="sbx__input" />
    </div>
  </form>
);
