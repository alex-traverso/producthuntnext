import React, { useState } from "react";
import Router from "next/router";

const Search = () => {
  const [search, setSearch] = useState("");

  const searchProduct = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    Router.push({
      pathname: "/search",
      query: { q: search },
    });
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
