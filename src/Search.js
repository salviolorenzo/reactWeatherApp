import React from 'react';

function Search(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        placeholder="Search"
        name="search"
        value="London"
        onChange={props.onChange}
      />
      <input type="submit" value="Search" />
    </form>
  );
}

export default Search;
