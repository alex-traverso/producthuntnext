import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const searchProduct = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <>
      <div className='input-nav-container'>
        <form onSubmit={searchProduct}>
          <input
            type='text'
            placeholder='Buscar Productos'
            className='search-input'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit' className='submit-input'></button>
        </form>
      </div>
    </>
  );
};

export default Search;
