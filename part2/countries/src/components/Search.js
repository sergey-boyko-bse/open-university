import React from 'react'

const Search = ({handleKeywordChange}) => {
    return (
        <div>
            find countries
            <input onChange={handleKeywordChange} />
        </div>
    )
}

export default Search