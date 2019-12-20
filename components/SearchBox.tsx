import React from 'react'

export const SearchBox = ({value, onInput}) => (
  <form noValidate onSubmit={() => false} className="searchbox sbx">
    <div role="search" className="sbx__wrapper">
      <input type="search" name="search" value={value} onInput={onInput} placeholder="tag search" autoComplete="off" required={false} className="sbx__input" />
    </div>
  </form>
);
