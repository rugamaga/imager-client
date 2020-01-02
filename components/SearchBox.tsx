import React from 'react'

export const SearchBox = ({value, onChange}) => (
  <form noValidate onSubmit={e => e.preventDefault()} className="searchbox sbx">
    <div role="search" className="sbx__wrapper">
      <input
        type="search"
        name="search"
        value={value}
        onChange={onChange}
        placeholder="tag search"
        autoComplete="off"
        required={false}
        className="sbx__input"
      />
    </div>
  </form>
);
