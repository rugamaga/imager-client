import React from 'react'

export const SearchBox = ({value, onChange}) => (
  <form noValidate onSubmit={() => false} className="searchbox sbx">
    <div role="search" className="sbx__wrapper">
      <input
        type="search"
        name="search"
        defaultValue={value}
        onChange={onChange}
        placeholder="tag search"
        autoComplete="off"
        required={false}
        className="sbx__input"
      />
    </div>
  </form>
);
