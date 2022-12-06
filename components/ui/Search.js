import React from 'react'

const Search = () => {
return (
    <div className='input-nav-container'>
        <input type="text" placeholder='Buscar Productos' className='search-input'/>
        <button type='submit' className='submit-input'></button>
    </div>
)
}

export default Search;